using CakeFactory.Core.ResultObject;

namespace CakeFactory.Core.Entities;

public class PropertyOption
{
    public int Id { get; set; }
    public Product Product { get; protected set; }
    public int ProductId { get; protected set; }
    public string Option { get; internal set; }
    public double Price { get; internal set; }
    public PropertyType Property { get; protected set; }

    protected PropertyOption(int productId, string option, double price, PropertyType property)
    {
        ProductId = productId;
        Option = option;
        Price = price;
        Property = property;
    }
    
    public static Result<PropertyOption> Create(Product product, string option, double price, PropertyType type)
    {
        return new PropertyOption(product.Id, option, price, type);
    }
}