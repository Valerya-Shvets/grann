using CakeFactory.Core.ResultObject;

namespace CakeFactory.Core.Entities;

public class Chef
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string FirstName { get; protected set; }
    public string LastName { get; protected set; }
    public string MiddleName { get; protected set; }
    public string Position { get; protected set; }
    public string PhoneNumber { get; protected set; }
    public string Email { get; protected set; }
    public DateTime WorkSince { get; protected set; }
    public DateTime DateOfBirth { get; protected set; }

    private Chef() {}
    
    protected Chef(
        string userId,
        string firstName,
        string lastName,
        string middleName,
        string position,
        string phoneNumber,
        string email,
        DateTime workSince,
        DateTime dateOfBirth)
    {
        UserId = userId;
        FirstName = firstName;
        LastName = lastName;
        MiddleName = middleName;
        Position = position;
        PhoneNumber = phoneNumber;
        Email = email;
        WorkSince = workSince;
        DateOfBirth = dateOfBirth;
    }
    
    public static Result<Chef> Create(
        string firstName,
        string lastName,
        string middleName,
        string position,
        string phoneNumber,
        string email,
        DateTime workSince,
        DateTime dateOfBirth)
    {
        var chef = new Chef();
        
        var res = chef.SetFirstName(firstName);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        
        res = chef.SetLastName(lastName);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        
        res = chef.SetMiddleName(middleName);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        
        res = chef.SetPosition(position);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        
        res = chef.SetPhoneNumber(phoneNumber);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        
        res = chef.SetEmail(email);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        
        res = chef.SetWorkSince(workSince);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);

        res = chef.SetDateOfBirth(dateOfBirth);
        if (!res.IsSuccess) return Result.Failure<Chef>(res.Error);
        
        return chef;
    }

    public Result SetUserId(string userId)
    {
        UserId = userId;
        return Result.Success();
    }

    public Result SetFirstName(string newName)
    {
        FirstName = newName;
        return Result.Success();
    }
    
    public Result SetLastName(string newName)
    {
        LastName = newName;
        return Result.Success();
    }
    
    public Result SetMiddleName(string newName)
    {
        MiddleName = newName;
        return Result.Success();
    }
    
    public Result SetPosition(string newPosition)
    {
        Position = newPosition;
        return Result.Success();
    }

    public Result SetPhoneNumber(string newPhoneNumber)
    {
        PhoneNumber = newPhoneNumber;
        return Result.Success();
    }

    public Result SetEmail(string newEmail)
    {
        Email = newEmail;
        return Result.Success();
    }
    
    public Result SetWorkSince(DateTime newWorkSince)
    {
        WorkSince = newWorkSince;
        return Result.Success();
    }
    
    public Result SetDateOfBirth(DateTime newDateOfBirth)
    {
        DateOfBirth = newDateOfBirth;
        return Result.Success();
    }
}