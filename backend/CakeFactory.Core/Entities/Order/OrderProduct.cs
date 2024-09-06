using CakeFactory.Core.ResultObject;

namespace CakeFactory.Core.Entities;

public class OrderProduct
{
    public int Id { get; set; }
    public Product? Product { get; set; }
    public int? ProductId { get; set; }
    public Order Order { get; set; }
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
    public int? ChefId { get; set; }
    public DateTime? FinishedAt { get; set; }
    
    private OrderProduct() { }
    internal OrderProduct(
        Product product,
        Order order,
        string name, 
        string category, 
        string description, 
        int imageId, 
        List<string> components, 
        OrderPropertyOption? type, 
        OrderPropertyOption? decor, 
        OrderPropertyOption serving, 
        int? chefId, 
        DateTime? finishedAt)
    {
        Product = product;
        Order = order;
        Name = name;
        Category = category;
        Description = description;
        ImageId = imageId;
        Components = components;
        Type = type;
        Decor = decor;
        Serving = serving;
        ChefId = chefId;
        FinishedAt = finishedAt;
    }
}