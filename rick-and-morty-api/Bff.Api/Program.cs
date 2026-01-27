using Bff.Application.Episodes;
using Bff.Infrastructure.RickAndMorty;
using Bff.Api.Middleware;
using Bff.Application.Characters;
using Bff.Application.Dashboard;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICharacterService, CharacterService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();


builder.Services.AddHttpClient<IRickAndMortyClient, RickAndMortyClient>(client =>
{
    client.BaseAddress = new Uri("https://rickandmortyapi.com");
    client.Timeout = TimeSpan.FromSeconds(15);
});

builder.Services.AddScoped<IEpisodeService, EpisodeService>();

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/api/episodes", async (int? page, IEpisodeService service, CancellationToken ct) =>
{
    var result = await service.GetEpisodesAsync(page ?? 1, ct);
    return Results.Ok(result);
})
.WithName("GetEpisodes");

app.MapGet("/api/episodes/{id:int}", async (int id, IEpisodeService service, CancellationToken ct) =>
{
    var result = await service.GetEpisodeByIdAsync(id, ct);
    return Results.Ok(result);
})
.WithName("GetEpisodeById");

app.MapGet("/api/characters", async (int? page, ICharacterService service, CancellationToken ct) =>
{
    var result = await service.GetCharactersAsync(page ?? 1, ct);
    return Results.Ok(result);
})
.WithName("GetCharacters");

app.MapGet("/api/characters/{id:int}", async (int id, ICharacterService service, CancellationToken ct) =>
{
    var result = await service.GetCharacterByIdAsync(id, ct);
    return Results.Ok(result);
})
.WithName("GetCharacterById");

app.MapGet("/api/dashboard", async (IDashboardService service, CancellationToken ct) =>
{
    var result = await service.GetDashboardAsync(ct);
    return Results.Ok(result);
})
.WithName("GetDashboard");


app.Run();
