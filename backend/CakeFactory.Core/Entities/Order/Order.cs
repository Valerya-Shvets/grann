using CakeFactory.Core.ResultObject;

namespace CakeFactory.Core.Entities;

public class Order
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public ClientInfo ClientInfo { get; set; }
    public DeliveryInfo DeliveryInfo { get; set; }
    public PaymentInfo PaymentInfo { set; get; }
    public List<OrderProduct> Products { get; set; }
    public double TotalSum => Products.Sum(x => x.Serving.Price +
        x.Decor?.Price ?? 0 +
        x.Type?.Price ?? 0);
    public string Comment { get; set; }

    private Order() { }

    protected Order(ClientInfo clientInfo, 
        DeliveryInfo deliveryInfo, 
        PaymentInfo paymentInfo,
        string comment,
        DateTime createdAt, 
        DateTime? finishedAt)
    {
        ClientInfo = clientInfo;
        DeliveryInfo = deliveryInfo;
        Products = new List<OrderProduct>();
        Comment = comment;
        CreatedAt = createdAt;
        FinishedAt = finishedAt;
        PaymentInfo = paymentInfo;
    }

    public static Result<Order> Create(
        ClientInfo clientInfo, 
        DeliveryInfo deliveryInfo, 
        PaymentType paymentType,
        string comment)
    {
        var paymentInfo = new PaymentInfo
        {
            PaymentType = paymentType,
            IsPayed = false
        };
        
        var order = new Order(clientInfo,
            deliveryInfo,
            paymentInfo,
            comment,
            DateTime.Now, 
            null);

        return order;
    }
    
    public Result<OrderProduct> CreateProduct(
        Product product,
        int servingOptionId,
        int? typeOptionId,
        int? decorOptionId)
    {
        var servingOption = product.Servings.FirstOrDefault(x => x.Id == servingOptionId);
        if (servingOption is null) return Result.Failure<OrderProduct>(DomainErrors.OptionNotFound);
        PropertyOption? typeOption = null;
        if (product.Types is not null)
        {
            typeOption = product.Types.FirstOrDefault(x => x.Id == typeOptionId);
            if (typeOption is null) return Result.Failure<OrderProduct>(DomainErrors.OptionNotFound);
        }
        PropertyOption? decorOption = null;
        if (product.Decors is not null)
        {
            decorOption = product.Decors.FirstOrDefault(x => x.Id == decorOptionId);
            if (decorOption is null) return Result.Failure<OrderProduct>(DomainErrors.OptionNotFound);
        }

        var orderServing = new OrderPropertyOption(servingOption);
        var orderType = typeOption is not null ? new OrderPropertyOption(typeOption) : null;
        var orderDecor = decorOption is not null ? new OrderPropertyOption(decorOption) : null;

        var orderProduct = new OrderProduct(
            product,
            this,
            product.Name,
            product.Category,
            product.Description,
            product.ImageId,
            product.Components,
            orderType,
            orderDecor,
            orderServing,
            null,
            null);
            this.Products.Add(orderProduct);
        return orderProduct;
    }
}