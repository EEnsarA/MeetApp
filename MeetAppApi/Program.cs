using MeetAppApi.Context;
using MeetAppApi.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using MeetAppApi.Interfaces;


var policySettings = "myAllowSpesificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Cors

builder.Services.AddCors(options =>
{
    options.AddPolicy(policySettings, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
     
    });
});

// Mapper
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddDbContext<ApplicationContext>(option =>
{
    var config = builder.Configuration;
    var sqlServerConnection = config.GetConnectionString("sql_connection");
    option.UseSqlServer(sqlServerConnection);
});


// Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = /*builder.Configuration.GetSection("AppSettings:Issuer").Value ??*/ "MeetApp.com",
        ValidateAudience = false,
        ValidAudience = "",
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("AppSettings:SecretKey").Value ?? "")),
        ValidateLifetime = true,
    };
});


builder.Services.AddControllers();

builder.Services.AddScoped<IJwtHandler,JwtHandler>();
builder.Services.AddEndpointsApiExplorer();
//Swagger Auth UI 
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "MeetApp API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });

});



var app = builder.Build();

app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseCors(policySettings);

app.UseAuthorization();

app.MapControllers();

app.Run();
