using Bff.Application.Episodes;
using Bff.Application.Episodes.Mappers;
using Bff.Application.Characters;
using Bff.Application.Characters.Mappers;
using Bff.Application.Dashboard;
using Bff.Application.Dashboard.Mappers;
using Bff.Infrastructure.RickAndMorty;
using Bff.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IEpisodeService, EpisodeService>();
builder.Services.AddScoped<ICharacterService, CharacterService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IEpisodeMapper, EpisodeMapper>();
builder.Services.AddScoped<ICharacterMapper, CharacterMapper>();
builder.Services.AddScoped<IDashboardMapper, DashboardMapper>();

builder.Services.AddHttpClient<IRickAndMortyClient, RickAndMortyClient>(client =>
{
    client.BaseAddress = new Uri("https://rickandmortyapi.com");
    client.Timeout = TimeSpan.FromSeconds(15);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseCors("AllowAngularApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/api/episodes", async (int? page, IEpisodeService service, CancellationToken ct) =>
{
    var result = await service.GetEpisodesAsync(page ?? 1, ct);
    return Results.Ok(result);
})
.WithName("GetEpisodes")
.WithTags("Episodes");

app.MapGet("/api/episodes/{id:int}", async (int id, IEpisodeService service, CancellationToken ct) =>
{
    var result = await service.GetEpisodeByIdAsync(id, ct);
    return Results.Ok(result);
})
.WithName("GetEpisodeById")
.WithTags("Episodes");

app.MapGet("/api/characters", async (int? page, ICharacterService service, CancellationToken ct) =>
{
    var result = await service.GetCharactersAsync(page ?? 1, ct);
    return Results.Ok(result);
})
.WithName("GetCharacters")
.WithTags("Characters");

app.MapGet("/api/characters/{id:int}", async (int id, ICharacterService service, CancellationToken ct) =>
{
    var result = await service.GetCharacterByIdAsync(id, ct);
    return Results.Ok(result);
})
.WithName("GetCharacterById")
.WithTags("Characters");

app.MapGet("/api/dashboard", async (IDashboardService service, CancellationToken ct) =>
{
    var result = await service.GetDashboardAsync(ct);
    return Results.Ok(result);
})
.WithName("GetDashboard")
.WithTags("Dashboard");

app.Run();