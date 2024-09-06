using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CakeFactory.Application.Abstractions;
using CakeFactory.Application.Errors;
using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace CakeFactory.Application.Services;

public class AccountService : IAccountService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly string _registerTokenClaimTypeName = "Token_claim";

    public AccountService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _roleManager = roleManager;
    }

    public async Task<Result<LoginResponse>> Login(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user == null) return Result.Failure<LoginResponse>(AccountErrors.UserNotFound);
        
        var result = await _signInManager.PasswordSignInAsync(
            user: user, 
            password: request.Password, 
            isPersistent: false, 
            lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            return Result.Failure<LoginResponse>(AccountErrors.Identity);
        }
        
        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Sid, user.Id),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        
        authClaims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));

        var token = GetToken(authClaims);
        
        return new LoginResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token), 
            Role = userRoles.Single()
        };
    }

    public async Task<Result<IdentityUser>> CreateUser(string login, string email, string phone,
        string role, string password)
    {
        var isRoleExist = await _roleManager.RoleExistsAsync(role);
        
        if (!isRoleExist) return Result.Failure<IdentityUser>(AccountErrors.RoleNotExist);
        var user = new IdentityUser(login)
        {
            Email = email,
            PhoneNumber = phone
        };
        var identityResult = await _userManager.CreateAsync(
            user, password);

        if (!identityResult.Succeeded)
        {
            return Result.Failure<IdentityUser>(new Error(string.Join('\n', identityResult.Errors)));
        }

        await _userManager.AddToRoleAsync(user, role);

        return user;
    }

    public async Task<Result> UpdatePassword(ChangePassword request, string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        var identityResult = await _userManager.ChangePasswordAsync(user, request.OldPassword, request.NewPassword);

        if (!identityResult.Succeeded)
        {
            return Result.Failure(new Error(string.Join('\n', identityResult.Errors)));
        }
        
        return Result.Success();
    }

    public async Task<Result> DeleteUser(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user != null)
        {
            await _userManager.DeleteAsync(user);
        }
        
        return Result.Success();
    }
    
    private JwtSecurityToken GetToken(IEnumerable<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: DateTime.Now.AddHours(10000),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return token;
    }

    public async Task<Result> ValidateRegistrationToken(string token, string roleName)
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        
        if (role is null) return Result.Failure(AccountErrors.RoleNotExist);

        var claim = (await _roleManager.GetClaimsAsync(role)).FirstOrDefault(x => x.Type == _registerTokenClaimTypeName);
        
        if (claim is null) return Result.Failure(AccountErrors.Identity);

        return token == claim.Value ? Result.Success() : Result.Failure(AccountErrors.WrongToken);
    }

    private string GenerateRegisterToken()
    {
        StringBuilder builder = new StringBuilder();
        var random = new Random();
        for (int i = 0; i < 12; i++)
        {
            builder.Append(random.Next(1, 10));
        }

        return builder.ToString();
    }

    public async Task<Result<string>> ResetRegistrationToken(string roleName)
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        
        if (role is null) return Result.Failure<string>(AccountErrors.RoleNotExist);

        var claim = (await _roleManager.GetClaimsAsync(role)).FirstOrDefault(x => x.Type == _registerTokenClaimTypeName);

        var newToken = GenerateRegisterToken();

        if (claim is not null)
        {
            var result = await _roleManager.RemoveClaimAsync(role, claim);
            if (!result.Succeeded) return Result.Failure<string>(new Error(string.Join('\n', result.Errors)));
        }
        
        await _roleManager.AddClaimAsync(role, new Claim(_registerTokenClaimTypeName, newToken));

        return newToken;
    }

    public async Task<Result<string>> GetRegistrationToken(string roleName)
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        
        if (role is null) return Result.Failure<string>(AccountErrors.RoleNotExist);

        var claim = (await _roleManager.GetClaimsAsync(role)).FirstOrDefault(x => x.Type == _registerTokenClaimTypeName);
        
        if (claim is null) return await ResetRegistrationToken(roleName);

        return claim.Value;
    }
}