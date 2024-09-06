using System.Text;
using CakeFactory.Infrastructure.EF;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Domain = CakeFactory.Core.Entities;
using ViewModel = CakeFactory.Application.ViewModel;

namespace CakeFactory;

public static class InfrastructureInjector
{
    public static IServiceCollection AddContext(this IServiceCollection services, ConfigurationManager configurationManager)
    {
        return services.AddDbContext<AppDbContext>(
            opt => opt.UseSqlServer(
                configurationManager.GetConnectionString("SqlServer") ?? throw new InvalidOperationException()));
    }
    
    public static IServiceCollection AddIdentityConfiguration(this IServiceCollection services)
    {
        services.AddIdentity<IdentityUser, IdentityRole>(o =>
            {
                o.Password.RequireDigit = true;
                o.Password.RequireLowercase = true;
                o.Password.RequireUppercase = true;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 8;

                o.SignIn.RequireConfirmedAccount = false;
                o.SignIn.RequireConfirmedEmail = false;
                o.SignIn.RequireConfirmedPhoneNumber = false;
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddSignInManager()
            .AddDefaultTokenProviders();

        return services;
    }

    public static IServiceCollection AddJwt(this IServiceCollection services, ConfigurationManager configurationManager)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = configurationManager["Jwt:Issuer"],
                ValidAudience = configurationManager["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes(configurationManager["Jwt:Key"] ?? throw new InvalidOperationException())),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true
            };
        });

        return services;
    }

    public static IServiceCollection AddMapper(this IServiceCollection services)
    {
        return services.AddAutoMapper(config =>
        {
            config.CreateMap<Domain.Product, ViewModel.Product>();
            config.CreateMap<Domain.PropertyOption, ViewModel.PropertyOption>();
            config.CreateMap<Domain.Product, ViewModel.ProductShort>()
                .ForMember(ps => ps.Serving, expr => 
                    expr.MapFrom(p => p.Servings[0]));
            config.CreateMap<Domain.Chef, ViewModel.Chef>();
            config.CreateMap<Domain.Chef, ViewModel.ChefShort>();
            config.CreateMap<Domain.OrderProduct, ViewModel.OrderProductShort>()
                .ForMember(ops => ops.Name, expr =>
                    expr.MapFrom(op => op.Name))
                .ForMember(ops => ops.ImageId, expr =>
                    expr.MapFrom(op => op.ImageId))
                .ForMember(ops => ops.CreatedAt, expr =>
                    expr.MapFrom(op => op.Order.CreatedAt))
                .ForMember(ops => ops.DeliveryDate, expr =>
                    expr.MapFrom(op => op.Order.DeliveryInfo.DeliveryDate))
                .ForMember(ops => ops.Status, expr =>
                    expr.MapFrom((src, dest) =>
                    {
                        return src switch
                        {
                            { ChefId: not null, FinishedAt: not null, Order.DeliveryInfo.Delivered: true } => ViewModel.Status.Delivered,
                            { ChefId: not null, FinishedAt: not null } => ViewModel.Status.Ready,
                            { ChefId: not null, FinishedAt: null } => ViewModel.Status.InWork,
                            { ChefId: null } => ViewModel.Status.Created,
                            _ => throw new ArgumentOutOfRangeException()
                        };
                    }));
            config.CreateMap<ViewModel.ClientInfo, Domain.ClientInfo>();
            config.CreateMap<ViewModel.DeliveryInfo, Domain.DeliveryInfo>();
            config.CreateMap<Domain.Order, ViewModel.Order>();
            config.CreateMap<Domain.OrderProduct, ViewModel.OrderProduct>();
            config.CreateMap<Domain.ClientInfo, ViewModel.ClientInfo>();
            config.CreateMap<Domain.DeliveryInfo, ViewModel.DeliveryInfo>();
            config.CreateMap<Domain.PaymentInfo, ViewModel.PaymentInfo>();
            config.CreateMap<Domain.OrderPropertyOption, ViewModel.OrderPropertyOption>();
            config.CreateMap<Domain.Photo, ViewModel.CreateImage>()
                .ForMember(x => x.FileName, expression => expression
                    .MapFrom(x => x.Id.ToString().Concat(x.FileExtension)));
        });
    }
}