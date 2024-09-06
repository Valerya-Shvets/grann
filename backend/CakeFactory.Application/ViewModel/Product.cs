namespace CakeFactory.Application.ViewModel;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public int ImageId { get; set; }
    public List<string> Components { get; set; }
    public List<PropertyOption>? Types { get; set; }
    public List<PropertyOption>? Decors { get; set; }
    public List<PropertyOption> Servings { get; set; }
}