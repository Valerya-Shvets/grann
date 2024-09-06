namespace CakeFactory.Application.ViewModel;

public class CreateOrder
{
    public ClientInfo ClientInfo { get; set; }
    public DeliveryInfo DeliveryInfo { get; set; }
    public CakeFactory.Core.Entities.PaymentType PaymentType { set; get; }
    public List<CreateOrderProduct> Products { get; set; }
    public string Comment { get; set; }
}