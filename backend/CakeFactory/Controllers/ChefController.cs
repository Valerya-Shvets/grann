using CakeFactory.Application.Abstractions;
using CakeFactory.Application.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CakeFactory.Controllers;

[ApiController]
[Route("api/chef/")]
public class ChefController : Controller
{
    private readonly IChefService _chefService;

    public ChefController(IChefService chefService)
    {
        _chefService = chefService;
    }

    [Authorize]
    [HttpPut("")]
    public async Task<IActionResult> UpdateChef(Chef request)
    {
        var result = await _chefService.UpdateChef(request);

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        
        return NotFound(result.Error.Message);
    }

    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetAllChefs()
    {
        var result = await _chefService.GetAllChefs();
        return Ok(result.Value);
    }

    [Authorize]
    [HttpGet("{chefId:int}")]
    public async Task<IActionResult> GetChef(int chefId)
    {
        var result = await _chefService.GetChef(chefId);

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        
        return NotFound(result.Error.Message);
    }

    [Authorize]
    [HttpDelete("{chefId:int}")]
    public async Task<IActionResult> DeleteChef(int chefId)
    {
        var result = await _chefService.DeleteChef(chefId);
        
        if (result.IsSuccess)
        {
            return Ok();
        }
        
        return NotFound(result.Error.Message);
    }
}