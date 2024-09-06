namespace CakeFactory.Application.ViewModel;

public class Catalog
{
    public List<string> Categories { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public List<ProductShort> Products { get; set; }
}