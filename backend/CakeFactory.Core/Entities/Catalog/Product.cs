using CakeFactory.Core.ResultObject;

namespace CakeFactory.Core.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; protected set; }
    public string Category { get; protected set; }
    public string Description { get; protected set; }
    public int ImageId { get; protected set; }
    public List<string> Components { get; protected set; }
    
    public IReadOnlyList<PropertyOption>? Types => Options.Where(option => option.Property == PropertyType.Type).ToList();
    public IReadOnlyList<PropertyOption>? Decors => Options.Where(option => option.Property == PropertyType.Decor).ToList();
    public IReadOnlyList<PropertyOption> Servings => Options.Where(option => option.Property == PropertyType.Serving).ToList();
    public List<PropertyOption> Options { get; protected set; } = new();
    private readonly List<OrderProduct> _orders = new();

    protected Product(
        string name,
        string category,
        string description,
        int imageId,
        List<string> components)
    {
        Name = name;
        Category = category;
        Description = description;
        ImageId = imageId;
        Components = components;
    }
    
    public static Result<Product> Create(
        string name, 
        string category, 
        string description, 
        int imageId, 
        List<string> components)
    {
        return new Product(
            name,
            category,
            description,
            imageId,
            components);
    }

    private Result AddOption(string option, double price, PropertyType propertyType)
    {
        var result = PropertyOption.Create(this, option, price, propertyType);
        
        if (!result.IsSuccess) return Result.Failure(result.Error);
        
        Options.Add(result.Value);
        return Result.Success();
    }

    public Result UpdateOption(int id, string option, double price)
    {
        var entity = Options.First(x => x.Id == id);
        entity.Option = option;
        entity.Price = price;

        return Result.Success();
    }

    public Result AddType(string option, double price)
    {
        return AddOption(option, price, PropertyType.Type);
    }
    
    public Result AddDecor(string option, double price)
    {
        return AddOption(option, price, PropertyType.Decor);
    }
    
    public Result AddServing(string option, double price)
    {
        return AddOption(option, price, PropertyType.Serving);
    }
}