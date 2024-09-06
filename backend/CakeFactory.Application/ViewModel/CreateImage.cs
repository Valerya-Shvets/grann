using Microsoft.AspNetCore.Http;

namespace CakeFactory.Application.ViewModel;

public class CreateImage
{
    public string FileName { get; set; }
    public IFormFile Image { get; set; }
}