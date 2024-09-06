using CakeFactory.Core.ResultObject;

namespace CakeFactory.Application.Errors;

public static class OrdersErrors
{
    public static readonly Error ChefNotFound = new("Chef with this id is not found");
    public static readonly Error OrderProductNotFound = new("Order Product with this id is not found");
    public static readonly Error AlreadyInWork = new("This Order Product have been already taken in work");
    public static readonly Error NotTakenInWork = new("This Order Product haven`t been taken in work");
    public static readonly Error AlreadyDone = new("This Order Product have been already done");
    public static readonly Error OrderNotFound = new("Order with this id is not found");
    public static readonly Error OrderNotDone = new("This Order haven`t done yet");
    public static readonly Error AlreadyDelivered = new("This Order have been already delivered");
    public static readonly Error ProductNotFound = new("Product with this id is not found");
}