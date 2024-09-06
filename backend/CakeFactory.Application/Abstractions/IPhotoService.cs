using CakeFactory.Application.ViewModel;
using CakeFactory.Core.Entities;
using CakeFactory.Core.ResultObject;
using Microsoft.AspNetCore.Http;

namespace CakeFactory.Application.Abstractions;

public interface IPhotoService
{
    public Task<int> CreatePhoto(IFormFile dto);
    public Task<Result<Photo>> GetPhoto(int id);
}