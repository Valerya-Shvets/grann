namespace CakeFactory.Core.Entities;

public class OrderPropertyOption
{
    public string Option { get; set; }

    public double Price { get; set; }

    public OrderPropertyOption(string option, double price)
    {
        Option = option;
        Price = price;
    }

    public OrderPropertyOption(PropertyOption propertyOption)
    {
        Option = propertyOption.Option;
        Price = propertyOption.Price;
    }
}