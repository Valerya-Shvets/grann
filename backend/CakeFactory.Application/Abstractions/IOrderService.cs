using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;
using Core = CakeFactory.Core.Entities;

namespace CakeFactory.Application.Abstractions;

public interface IOrderService
{
    public Task<Result<List<OrderProductShort>>> GetALlOrderProducts(bool includeDelivered);
    public Task<Result> TakeInWork(int orderProductId, int chefId);
    public Task<Result> Ready(int orderProductId);
    public Task<Result> Delivered(int orderProductId);
    public Task<Result<Order>> CreateOrder(CreateOrder request);
}