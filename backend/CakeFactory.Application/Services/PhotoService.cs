using AutoMapper;
using CakeFactory.Application.Abstractions;
using CakeFactory.Application.ViewModel;
using CakeFactory.Core.Entities;
using CakeFactory.Core.ResultObject;
using CakeFactory.Infrastructure.EF;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace CakeFactory.Application.Services;

public class PhotoService : IPhotoService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly List<Photo> _cache = new();
    private void InsertInCache(Photo image)
    {
        _cache.Add(image);
        if (_cache.Count == 21)
        {
            _cache.RemoveAt(0);
        }
    }

    public PhotoService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<int> CreatePhoto( IFormFile dto)
    {
        Console.WriteLine(dto.FileName);
        Photo image = new Photo { FileExtension = Path.GetExtension(dto.FileName)};
        byte[] imageData = null;
        using (var binaryReader = new BinaryReader(dto.OpenReadStream()))
        {
            imageData = binaryReader.ReadBytes((int)dto.Length);
        }
        image.Bytes = imageData;

        await _context.Photos.AddAsync(image);
        await _context.SaveChangesAsync();
        InsertInCache(image);
        return image.Id;
    }
    
    public async Task<Result<Photo>> GetPhoto(int id)
    {
        var cache = _cache.FirstOrDefault(x => x.Id == id);
        if (cache is not null)
        {
            return cache;
        }
        var photo = await _context.Photos.FirstOrDefaultAsync(x => x.Id == id);
        Console.WriteLine(photo.Id);
        if (photo is null) return Result.Failure<Photo>(ImageErrors.PhotoNotFound);
        InsertInCache(photo);
        return photo;
    }
}