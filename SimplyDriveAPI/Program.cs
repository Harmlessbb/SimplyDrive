using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using SimplyDriveAPI.Models;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


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
