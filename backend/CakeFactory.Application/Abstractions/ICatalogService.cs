using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;
using CoreCatalog = CakeFactory.Core.Entities;

namespace CakeFactory.Application.Abstractions;

public interface ICatalogService
{
    public Task<Result<Product>> CreateProduct(CreateProduct request);
    public Task<Result<Product>> UpdateProduct(Product request);
    public Task<Result<List<ProductShort>>> GetAllProducts();
    public Task<Result<Product>> GetProduct(int id);
    public Task<Result> DeleteProduct(int id);
    public Task<Result<List<ProductShort>>> GetBestsellers(int count);
    public Task<Result<List<string>>> GetAllCategories();
    public Task<Result<Catalog>> GetCatalog(CatalogFilter request);
}