using AutoMapper;
using CakeFactory.Application.Abstractions;
using CakeFactory.Application.Errors;
using CakeFactory.Application.ViewModel;
using CakeFactory.Core.ResultObject;
using CakeFactory.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using Domain = CakeFactory.Core.Entities;

namespace CakeFactory.Application.Services;

public class ChefService : IChefService
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public ChefService(IMapper mapper, AppDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }
    private TDestination Map<TSource, TDestination>(TSource source)
    {
        return _mapper.Map<TSource, TDestination>(source);
    }

    public async Task<Result<Chef>> CreateChef(CreateChef request, string userId)
    {
        var res = Domain.Chef.Create(
            request.FirstName,
            request.LastName,
            request.MiddleName,
            request.Position,
            request.PhoneNumber,
            request.Email,
            request.WorkSince,
            request.DateOfBirth);

        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);

        res.Value.SetUserId(userId);
        _context.Add(res.Value);
        await _context.SaveChangesAsync();

        return Map<Domain.Chef, Chef>(res.Value);
    }

    public async Task<Result<Chef>> UpdateChef(Chef request)
    {
        var res = Domain.Chef.Create(
            request.FirstName,
            request.LastName,
            request.MiddleName,
            request.Position,
            request.PhoneNumber,
            request.Email,
            request.WorkSince,
            request.DateOfBirth);
        
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        res.Value.Id = request.Id;
        
        var entity = _context.Attach(res.Value);
        entity.State = EntityState.Modified;
        
        await _context.SaveChangesAsync();
        
        return Map<Domain.Chef, Chef>(res.Value);
    }

    public async Task<Result<List<ChefShort>>> GetAllChefs()
    {
        var res = await _context.Chefs.AsNoTracking().ToListAsync();
        return Map<List<Domain.Chef>, List<ChefShort>>(res);
    }

    public async Task<Result<Chef>> GetChef(int id)
    {
        var res = await _context.Chefs.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        
        return res is not null ? 
            Map<Domain.Chef, Chef>(res) : 
            Result.Failure<Chef>(OrdersErrors.ChefNotFound);
    }

    public async Task<Result> DeleteChef(int id)
    {
        var res = await _context.Chefs.FirstOrDefaultAsync(x => x.Id == id);

        if (res is null) return Result.Failure<Chef>(OrdersErrors.ChefNotFound);
        
        _context.Remove(res);
        await _context.SaveChangesAsync();
        return Result.Success();
    }

    public async Task<Result<Chef>> GetChefByUserId(string userId)
    {
        var res = await _context.Chefs.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == userId);
        
        return res is not null ? 
            Map<Domain.Chef, Chef>(res) : 
            Result.Failure<Chef>(OrdersErrors.ChefNotFound);
    }
}