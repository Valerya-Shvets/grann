using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;

namespace CakeFactory.Application.Abstractions;

public interface IChefService
{
    public Task<Result<Chef>> CreateChef(CreateChef request, string userId);
    public Task<Result<Chef>> UpdateChef(Chef request);
    public Task<Result<List<ChefShort>>> GetAllChefs();
    public Task<Result<Chef>> GetChef(int id);
    public Task<Result> DeleteChef(int id);
    public Task<Result<Chef>> GetChefByUserId(string userId);

}