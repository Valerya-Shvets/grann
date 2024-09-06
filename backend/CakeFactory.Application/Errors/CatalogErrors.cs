using CakeFactory.Core.ResultObject;

namespace CakeFactory.Application.Errors;

public static class CatalogErrors
{
    public static readonly Error NoAvailableServings = new("Product not contain available servings options");
    public static readonly Error ProductNotFound = new("Product with this id is not found");
}