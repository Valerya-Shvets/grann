namespace CakeFactory.Application.ViewModel;

public class CreateProduct
{
    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public int ImageId { get; set; }
    public List<string> Components { get; set; }
    public List<CreatePropertyOption>? Types { get; set; } 
    public List<CreatePropertyOption>? Decors { get; set; }
    public List<CreatePropertyOption> Servings { get; set; }
}