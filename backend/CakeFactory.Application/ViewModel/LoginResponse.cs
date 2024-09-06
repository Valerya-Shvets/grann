namespace CakeFactory.Application.ViewModel;

public record LoginResponse
{
    public string Token { get; set; }
    public string Role { get; set; }
}