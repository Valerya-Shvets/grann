using CakeFactory.Core.ResultObject;

namespace CakeFactory.Application.Abstractions;

public static class ImageErrors
{
    public static readonly Error PhotoNotFound = new Error("Photo with this id not found");
}