using CakeFactory.Application.Abstractions;
using CakeFactory.Application.Errors;
using CakeFactory.Application.Services;
using CakeFactory.Application.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CakeFactory.Controllers;

[ApiController]
[Route("api/product/")]
public class ProductController : Controller
{
    private readonly ICatalogService _catalogService;

    public ProductController(ICatalogService catalogService)
    {
        _catalogService = catalogService;
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetAllCategories()
    {
        var result = await _catalogService.GetAllCategories();
        return Ok(result.Value);
    }

    [Authorize]
    [HttpPost("")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProduct request)
    {
        var result = await _catalogService.CreateProduct(request);

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        return BadRequest(result.Error.Message);
    }

    [Authorize]
    [HttpPut("")]
    public async Task<IActionResult> UpdateProduct(Product request)
    {
        var result = await _catalogService.UpdateProduct(request);

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        
        if (result.Error == CatalogErrors.ProductNotFound)
        {
            return NotFound(result.Error.Message);
        }

        return BadRequest(result.Error.Message);
    }

    [HttpGet("")]
    public async Task<IActionResult> GetAllProducts()
    {
        var result = await _catalogService.GetAllProducts();
        
        return Ok(result.Value);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var result = await _catalogService.GetProduct(id);

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        
        return NotFound(result.Error.Message);
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct( int id)
    {
        var result = await _catalogService.DeleteProduct(id);

        if (result.IsSuccess)
        {
            return Ok();
        }
        
        return NotFound(result.Error.Message);
    }

    [HttpGet("bestsellers")]
    public async Task<IActionResult> GetBestsellers()
    {
        var result = await _catalogService.GetBestsellers(5);
        
        return Ok(result.Value);
    }

    [HttpPost("catalog")]
    public async Task<IActionResult> GetCatalog(CatalogFilter request)
    {
        var result = await _catalogService.GetCatalog(request);
        
        return Ok(result.Value);
    }
}