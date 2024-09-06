namespace CakeFactory.Application.ViewModel;

public class Order
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public ClientInfo ClientInfo { get; set; }
    public DeliveryInfo DeliveryInfo { get; set; }
    public PaymentInfo PaymentInfo { set; get; }
    public List<OrderProduct> Products { get; set; }
    public string Comment { get; set; }
}