namespace CakeFactory.Application.ViewModel;

public class OrderProduct
{
    public int Id { get; set; }
    public int? ProductId { get; set; }
    public int OrderId { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public int ImageId { get; set; }
    public List<string> Components { get; set; }
    public OrderPropertyOption? Type { get; set; }
    public OrderPropertyOption? Decor { get; set; }
    public OrderPropertyOption Serving { get; set; }
    public Chef? Chef { get; set; }
    public DateTime? FinishedAt { get; set; }
}