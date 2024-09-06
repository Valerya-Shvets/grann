using System.Security.Claims;
using CakeFactory.Application.Abstractions;
using CakeFactory.Application.Errors;
using CakeFactory.Application.Services;
using CakeFactory.Application.ViewModel;
using CakeFactory.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CakeFactory.Controllers;


[ApiController]
[Route("api/[controller]/")]
public class AuthController : Controller
{
    private readonly IAccountService _accountService;
    private readonly IChefService _chefService;

    public AuthController(IAccountService accountService, IChefService chefService)
    {
        _accountService = accountService;
        _chefService = chefService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {

        Console.WriteLine(request.Email);
        Console.WriteLine(request.Password);

        var result = await _accountService.Login(request);
        
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        if (result.Error == AccountErrors.UserNotFound)
        {
            return NotFound(result.Error.Message);
        }
        
        if (result.Error == AccountErrors.Identity)
        {
            return BadRequest(result.Error.Message);
        }

        return StatusCode(500, result.Error.Message);
    }
    
    [HttpPost("register/chef/{regToken}")]
    [AllowAnonymous]
    public async Task<IActionResult> RegisterChef([FromBody] CreateChef request, [FromRoute] string regToken)
    {
        var res = await _accountService.ValidateRegistrationToken(regToken, IdentityRoles.Chef);

        if (!res.IsSuccess)
        {
            return Forbid(res.Error);
        }
        
        if (request.Password != request.PasswordConfirmation)
        {
            return BadRequest("Password doesn't match");
        }
        
        var result = await _accountService.CreateUser(request.Email, request.Email, request.PhoneNumber, IdentityRoles.Chef, request.Password);
        
        if (!result.IsSuccess)
        {
            if (result.Error == AccountErrors.UserNotFound)
            {
                return NotFound(result.Error.Message);
            }
        
            if (result.Error == AccountErrors.Identity)
            {
                return BadRequest(result.Error.Message);
            }
        }

        var chefResult = await _chefService.CreateChef(request, result.Value.Id);

        if (chefResult.IsSuccess)
        {
            return Ok(chefResult.Value);
        }
        
        return BadRequest(result.Error.Message);
    }
    
    [HttpGet("register/chef/getToken")]
    [Authorize(Roles = IdentityRoles.Admin)]
    [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRegisterToken()
    {
        var res = await _accountService.GetRegistrationToken(IdentityRoles.Chef);

        if (!res.IsSuccess)
        {
            return BadRequest(res.Error);
        }

        return Ok(res.Value);
    }
    
    [HttpGet("register/chef/resetToken")]
    [Authorize(Roles = IdentityRoles.Admin)]
    [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ResetRegisterToken()
    {
        var res = await _accountService.ResetRegistrationToken(IdentityRoles.Chef);

        if (!res.IsSuccess)
        {
            return BadRequest(res.Error);
        }

        return Ok(res.Value);
    }
    
    [HttpPut]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(string), StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> UpdatePassword([FromBody] ChangePassword request)
    {
        Claim? claim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid);
        var userId = claim?.Value;

        var result = await _accountService.UpdatePassword(request, userId!);
        
        if (result.IsSuccess)
        {
            return Ok();
        }

        return BadRequest(result.Error.Message);
    }
}