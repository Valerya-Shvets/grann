namespace CakeFactory.Application.ViewModel;

public class OrderProductShort
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string Name { get; set; }
    public int ImageId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime DeliveryDate { get; set; }
    public Status Status { get; set; }
    public DateTime? FinishedAt { get; set; }
    public int? ChefId { get; set; }
    public List<string> Components { get; set; }
    public OrderPropertyOption? Type { get; set; }
    public OrderPropertyOption? Decor { get; set; }
    public OrderPropertyOption Serving { get; set; }
}