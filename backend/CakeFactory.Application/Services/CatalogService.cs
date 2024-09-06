using AutoMapper;
using CakeFactory.Application.Abstractions;
using CakeFactory.Application.Errors;
using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;
using CakeFactory.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using Domain = CakeFactory.Core.Entities;

namespace CakeFactory.Application.Services;

public class CatalogService : ICatalogService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    private IQueryable<Domain.Product> Products => _context.Products.Include(x => x.Options);
    
    public CatalogService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    private TDestination Map<TSource, TDestination>(TSource source)
    {
        return _mapper.Map<TSource, TDestination>(source);
    }

    public async Task<Result<Product>> CreateProduct(CreateProduct request)
    {
        var result = Domain.Product.Create(
            request.Name,
            request.Category,
            request.Description,
            request.ImageId,
            request.Components);
        
        if (!result.IsSuccess) return Result.Failure<Product>(result.Error);

        var product = result.Value;
        
        _context.Add(product);
        
        if (request.Types != null && request.Types.Any())
        {
            var typeAddRes = ApplyFunction(request.Types, product.AddType);
            if (!typeAddRes.IsSuccess) return Result.Failure<Product>(typeAddRes.Error);
        }
        if (request.Decors != null && request.Decors.Any())
        {
            var decorsAddRes = ApplyFunction(request.Decors, product.AddDecor);
            if (!decorsAddRes.IsSuccess) return Result.Failure<Product>(decorsAddRes.Error);
        }

        if (!request.Servings.Any())
        {
            return Result.Failure<Product>(CatalogErrors.NoAvailableServings);
        }
        
        var servingAddRes = ApplyFunction(request.Servings, product.AddServing);
        if (!servingAddRes.IsSuccess) return Result.Failure<Product>(servingAddRes.Error);

        await _context.SaveChangesAsync();
        
        return Map<Domain.Product, Product>(product);
    }

    private Result ApplyFunction(IEnumerable<CreatePropertyOption> options, Func<string, double, Result> func)
    {
        foreach (var o in options)
        {
            var res = func(o.Option, o.Price);
            if (!res.IsSuccess)
            {
                return Result.Failure<Product>(res.Error);
            }
        }
        
        return Result.Success();
    }

    public async Task<Result<Product>> UpdateProduct(Product request)
    {
        request.Types ??= new List<PropertyOption>();
        request.Decors ??= new List<PropertyOption>();
        
        var product = await Products.FirstOrDefaultAsync(x => x.Id == request.Id);
        if (product is null) return Result.Failure<Product>(CatalogErrors.ProductNotFound);

        var toDelete = product.Options.ExceptBy(
            request.Types.Select(x => x.Id)
                .Concat(
                    request.Decors.Select(x => x.Id))
                .Concat(request.Servings.Select(x => x.Id)),
            x => x.Id);
        
        _context.RemoveRange(toDelete);
        
        var toUpdate = request.Types
            .Concat(request.Decors)
            .Concat(request.Servings)
            .IntersectBy(product.Options.Select(x => x.Id),
            x => x.Id);

        foreach (var option in toUpdate)
        {
            product.UpdateOption(option.Id, option.Option, option.Price);
        }

        ApplyFunction(request.Types.Where(x => x.Id == 0), product.AddType);
        ApplyFunction(request.Decors.Where(x => x.Id == 0), product.AddDecor);
        ApplyFunction(request.Servings.Where(x => x.Id == 0), product.AddServing);

        _context.Update(product);

        await _context.SaveChangesAsync();

        return Map<Domain.Product, Product>(product);
    }

    public async Task<Result<List<ProductShort>>> GetAllProducts()
    {
        var products = await Products.AsNoTracking().Include(x => x.Options).ToListAsync();
        Console.WriteLine(products.First().Options.Count());
        return Map<List<Domain.Product>, List<ProductShort>>(products);
    }

    public async Task<Result<Product>> GetProduct(int id)
    {
        var product = await Products.AsNoTracking().Include(x => x.Options).FirstOrDefaultAsync(x => x.Id == id);

        return product is not null ? 
            Map<Domain.Product, Product>(product) : 
            Result.Failure<Product>(CatalogErrors.ProductNotFound);
    }

    public async Task<Result> DeleteProduct(int id)
    {
        var product = await Products.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);

        if (product is null) return Result.Failure<Product>(CatalogErrors.ProductNotFound);
        
        _context.Remove(product);
        await _context.SaveChangesAsync();
            
        return Result.Success();

    }

    public async Task<Result<List<ProductShort>>> GetBestsellers(int count)
    {
        var ids = _context.OrderProducts
            .AsNoTracking()
            .GroupBy(x => x.ProductId)
            .Select(x => new { ProductId = x.Key, Quantity = x.Count() })
            .OrderByDescending(x => x.Quantity)
            .Select(x => x.ProductId)
            .Take(count);

        var products = await Products.Where(x => ids.Any(id => id == x.Id))
            .ToListAsync(); // TODO: Check if working

        return Map<List<Domain.Product>, List<ProductShort>>(products);
    }

    public async Task<Result<List<string>>> GetAllCategories()
    {
        var products = await Products.AsNoTracking().Select(x => x.Category).Distinct().ToListAsync();

        return products;
    }

    public async Task<Result<Catalog>> GetCatalog(CatalogFilter request)
    {
        var itemsOnPage = 15;
        
        var catalog = new Catalog()
        {
            CurrentPage = request.CurrentPage,
            Categories = request.Categories,
            Products = Map<List<Domain.Product>, List<ProductShort>>(await Products
            .Include(x => x.Options)
                .Where(x => request.Categories.Contains(x.Category))
                .Skip(itemsOnPage * (request.CurrentPage - 1))
                .Take(itemsOnPage)
                .ToListAsync()),
            TotalPages = (int)Math.Ceiling(_context.Products.Count() / (double)itemsOnPage)
        };

        return catalog;
    }
}