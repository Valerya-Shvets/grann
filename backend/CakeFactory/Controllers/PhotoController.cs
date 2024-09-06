using CakeFactory.Application.Abstractions;
using CakeFactory.Application.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Http;

namespace CakeFactory.Controllers;

[Route("api/[controller]")]
public class PhotoController : Controller
{
    private readonly IPhotoService _photoService;

    public PhotoController(IPhotoService photoService)
    {
        _photoService = photoService;
    }

    [HttpPost("")]
    public async Task<IActionResult> CreateImage( IFormFile image)
    {
        var id = await _photoService.CreatePhoto(image);

        return Ok(id);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetImage(int id)
    {
        Console.WriteLine(id);
        var result = await _photoService.GetPhoto(id);

        if (!result.IsSuccess) return NotFound(result.Error.Message);
        
        new FileExtensionContentTypeProvider().TryGetContentType(result.Value.FileExtension, out var contentType);
        return new FileContentResult(result.Value.Bytes, contentType ?? "application/octet-stream");
    }
}