using AutoMapper;
using CakeFactory.Application.Abstractions;
using CakeFactory.Application.Errors;
using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;
using CakeFactory.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using Domain = CakeFactory.Core.Entities;

namespace CakeFactory.Application.Services;

public class OrderService : IOrderService
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public OrderService(IMapper mapper, AppDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }
    
    private TDestination Map<TSource, TDestination>(TSource source)
    {
        return _mapper.Map<TSource, TDestination>(source);
    }

    public async Task<Result<List<OrderProductShort>>> GetALlOrderProducts(bool includeDelivered)
    {
        var res = await _context.OrderProducts
            .Include(x => x.Order)
            .Where(x => includeDelivered || !x.Order.DeliveryInfo.Delivered)
            .OrderBy(x => x.Order.DeliveryInfo.DeliveryDate)
            .AsNoTracking()
            .ToListAsync();

        return Map<List<Domain.OrderProduct>, List<OrderProductShort>>(res);
    }

    public async Task<Result> TakeInWork(int orderProductId, int chefId)
    {
        var orderProduct = await _context.OrderProducts
            .FirstOrDefaultAsync(x => x.Id == orderProductId);
        
        if (orderProduct is null) return Result.Failure(OrdersErrors.OrderProductNotFound);
        if (orderProduct.ChefId is not null) return Result.Failure(OrdersErrors.AlreadyInWork);

        orderProduct.ChefId = chefId;
        _context.Update(orderProduct);
        await _context.SaveChangesAsync();
        
        return Result.Success();
    }

    public async Task<Result> Ready(int orderProductId)
    {
        var orderProduct = await _context.OrderProducts
            .Include(x => x.Order).ThenInclude(order => order.Products)
            .FirstOrDefaultAsync(x => x.Id == orderProductId);
        
        if (orderProduct is null) return Result.Failure(OrdersErrors.OrderProductNotFound);
        if (orderProduct.ChefId is null) return Result.Failure(OrdersErrors.NotTakenInWork);
        if (orderProduct.FinishedAt is not null) return Result.Failure(OrdersErrors.AlreadyDone);

        orderProduct.FinishedAt = DateTime.Now;
        if (orderProduct.Order.Products.All(x => x.FinishedAt != null))
        {
            orderProduct.Order.FinishedAt = DateTime.Now;
        }
        
        _context.Update(orderProduct);
        _context.Update(orderProduct.Order);
        
        await _context.SaveChangesAsync();
        
        return Result.Success();
    }
    
    public async Task<Result> Delivered(int orderId)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(x => x.Id == orderId);
        
        if (order is null) return Result.Failure(OrdersErrors.OrderNotFound);
        if (order.FinishedAt is null) return Result.Failure(OrdersErrors.OrderNotDone);
        if (order.DeliveryInfo.Delivered) return Result.Failure(OrdersErrors.AlreadyDelivered);

        order.DeliveryInfo.Delivered = true;
        _context.Update(order);
        await _context.SaveChangesAsync();
        
        return Result.Success();
    }

    public async Task<Result<Order>> CreateOrder(CreateOrder request)
    {
        var orderResult = Domain.Order.Create(
            Map<ClientInfo, Domain.ClientInfo>(request.ClientInfo),
            Map<DeliveryInfo, Domain.DeliveryInfo>(request.DeliveryInfo),
            request.PaymentType,
            request.Comment);
        
        if (!orderResult.IsSuccess) return Result.Failure<Order>(orderResult.Error);
        
        var order = orderResult.Value;
        
        var products = _context.Products.Include(x => x.Options).ToList()
            .Join(request.Products, 
                db => db.Id,
                req => req.ProductId,
                (product, req) => new {product, req}).ToList();
            

        if (products.Count < request.Products.Count)
        {
            return Result.Failure<Order>(OrdersErrors.ProductNotFound);
        }

        foreach (var join in products)
        {
            var result = order.CreateProduct(join.product,
                join.req.ServingOptionId,
                join.req.TypeOptionId,
                join.req.DecorOptionId);
            
            if (!result.IsSuccess) return Result.Failure<Order>(result.Error);
        }

        _context.Add(order);
        await _context.SaveChangesAsync();
        
        return Map<Domain.Order, Order>(orderResult.Value);
    }
}