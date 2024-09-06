using System.Security.Claims;
using CakeFactory.Application.Abstractions;
using CakeFactory.Application.Services;
using CakeFactory.Application.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CakeFactory.Controllers;

[ApiController]
[Route("api/order/")]
public class OrderController : Controller
{
    private readonly IOrderService _orderService;
    private readonly IChefService _chefService;
    
    public OrderController(IOrderService orderService, IChefService chefService)
    {
        _orderService = orderService;
        _chefService = chefService;
    }
    
    [Authorize]
    [HttpGet("product")]
    public async Task<IActionResult> GetProductsInfo()
    {
        var result = await _orderService.GetALlOrderProducts(false);
        
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        
        return BadRequest(result.Error.Message);
    }
    
    [Authorize]
    [HttpPut("product/{id:int}/take")]
    public async Task<IActionResult> TakeInWork([FromRoute] int id)
    {
        Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid);
        if (idClaim is null)
        {
            return StatusCode(401);
        }
        
        var chefResult = await _chefService.GetChefByUserId(idClaim.Value);

        if (!chefResult.IsSuccess)
        {
            return NotFound(chefResult.Error);
        }

        var result = await _orderService.TakeInWork(id, chefResult.Value.Id);
        
        if (result.IsSuccess)
        {
            return Ok();
        }
        
        return NotFound(result.Error.Message);
    }
    
    //ToDo: errors
    [Authorize]
    [HttpPut("product/{id:int}/finish")]
    public async Task<IActionResult> Ready([FromRoute] int id)
    {
        Claim? idClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid);
        if (idClaim is null)
        {
            return StatusCode(401);
        }
        
        var result = await _orderService.Ready(id);
        
        if (result.IsSuccess)
        {
            return Ok();
        }
        
        return NotFound(result.Error.Message);
    }
    
    [Authorize]
    [HttpPut("delivered")]
    public async Task<IActionResult> Delivered(int orderId)
    {
        var result = await _orderService.Delivered(orderId);
        
        if (result.IsSuccess)
        {
            return Ok();
        }
        
        return NotFound(result.Error.Message);
    }
    
    [HttpPost("")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateOrder(CreateOrder request)
    {
        var result = await _orderService.CreateOrder(request);
        
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        
        return BadRequest(result.Error.Message);
    }
}