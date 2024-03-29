﻿using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Ordo.Services.Ordering.API.Data;
using Ordo.Services.Ordering.API.Mappers;
using Ordo.Services.Ordering.API.Orders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<OrderService>();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Ordering API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ordering.API v1"));
}

app.UseAuthorization();

app.MapControllers();

app.Run();

