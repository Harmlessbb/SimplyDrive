using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using SimplyDriveAPI.Models;
using SimplyDriveAPI.Services;
using System.Security.Claims;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options => 
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), o =>
    {
        //MAP ENUMS HERE
        o.MapEnum<DealerTagEnum>();
        o.MapEnum<BrandEnum>();
        o.MapEnum<TechSkillEnum>();
        o.MapEnum<fuelEnum>();
        o.MapEnum<MakeEnum>();
        o.MapEnum<ModelEnum>();
        o.MapEnum<JobTypeEnum>();
        o.MapEnum<BookingStatusEnum>();
    }));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "SimplyDrive API", Version = "v1" });
    c.SupportNonNullableReferenceTypes();
    c.UseAllOfToExtendReferenceSchemas();

    // Show enums as strings in SwaggerUI
    c.MapType<DealerTagEnum>(() => new Microsoft.OpenApi.Models.OpenApiSchema
    {
        Type = "string",
        Enum = Enum.GetNames(typeof(DealerTagEnum))
            .Select(n => new Microsoft.OpenApi.Any.OpenApiString(n))
            .ToList<Microsoft.OpenApi.Any.IOpenApiAny>()
    });
    c.MapType<BookingStatusEnum>(() => new Microsoft.OpenApi.Models.OpenApiSchema
    {
        Type = "string",
        Enum = Enum.GetNames(typeof(BookingStatusEnum))
        .Select(n => new Microsoft.OpenApi.Any.OpenApiString(n))
        .ToList<Microsoft.OpenApi.Any.IOpenApiAny>()
    });
});

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.RequireHttpsMetadata = true;
        options.Authority = "https://auth.simplydrive.app/realms/SimplyDrive";
        options.Audience = "SimplyDriveApp";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidIssuer = "https://auth.simplydrive.app/realms/SimplyDrive",

            ValidateAudience = false,
            ValidAudiences = new[] { "SimplyDriveApp", "account" }
        };
    });

builder.Services.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = ctx =>
        {
            Console.WriteLine("Auth failed: " + ctx.Exception);
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(7270, listenOptions =>
    {
        listenOptions.UseHttps();
    });
});

builder.Services.AddScoped<DealerServices>();
builder.Services.AddScoped<QRServices>();
builder.Services.AddScoped<BookingService>();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "Api Is Running");

app.Run();
