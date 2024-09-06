using CakeFactory.Core.ResultObject;

namespace CakeFactory.Application.Errors;

public static class AccountErrors
{
    public static readonly Error UserNotFound = new("User not found");
    public static readonly Error Identity = new("Identity error");
    public static readonly Error RoleNotExist = new("Role not exist");
    public static readonly Error WrongToken = new Error("Tokens don't match");
}