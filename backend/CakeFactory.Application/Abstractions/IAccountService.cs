using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;
using Microsoft.AspNetCore.Identity;

namespace CakeFactory.Application.Abstractions;

public interface IAccountService
{
    Task<Result<LoginResponse>> Login(LoginRequest request);
    Task<Result<IdentityUser>> CreateUser(string login, string email, string phone, string role,
        string password);
    Task<Result> UpdatePassword(ChangePassword request, string userId);
    Task<Result> DeleteUser(Guid userId);
    public Task<Result> ValidateRegistrationToken(string token, string roleName);
    public Task<Result<string>> ResetRegistrationToken(string roleName);
    public Task<Result<string>> GetRegistrationToken(string roleName);
}