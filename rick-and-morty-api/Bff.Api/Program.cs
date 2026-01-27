using Bff.Application.Episodes;
using Bff.Infrastructure.RickAndMorty;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<IRickAndMortyClient, RickAndMortyClient>(client =>
{
    client.BaseAddress = new Uri("https://rickandmortyapi.com");
    client.Timeout = TimeSpan.FromSeconds(15);
});

builder.Services.AddScoped<IEpisodeService, EpisodeService>();

var app = builder.Build();

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

app.Run();
