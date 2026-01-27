using System.Net.Http.Json;

namespace Bff.Infrastructure.RickAndMorty;

public sealed class RickAndMortyClient(HttpClient httpClient) : IRickAndMortyClient
{
    public async Task<RickAndMortyEpisodePage> GetEpisodesAsync(int page, CancellationToken cancellationToken)
    {
        if (page <= 0) page = 1;

        var response = await httpClient.GetAsync($"/api/episode?page={page}", cancellationToken);
        response.EnsureSuccessStatusCode();

        var data = await response.Content.ReadFromJsonAsync<RickAndMortyEpisodePage>(cancellationToken: cancellationToken);
        return data ?? throw new InvalidOperationException("Respuesta vacía desde RickAndMorty API.");
    }

    public async Task<RickAndMortyEpisode> GetEpisodeByIdAsync(int id, CancellationToken cancellationToken)
    {
        var response = await httpClient.GetAsync($"/api/episode/{id}", cancellationToken);
        response.EnsureSuccessStatusCode();

        var data = await response.Content.ReadFromJsonAsync<RickAndMortyEpisode>(cancellationToken: cancellationToken);
        return data ?? throw new InvalidOperationException("Respuesta vacía desde RickAndMorty API.");
    }

    public async Task<RickAndMortyCharacterPage> GetCharactersAsync(int page, CancellationToken cancellationToken)
    {
        if (page <= 0) page = 1;

        var response = await httpClient.GetAsync($"/api/character?page={page}", cancellationToken);
        response.EnsureSuccessStatusCode();

        var data = await response.Content.ReadFromJsonAsync<RickAndMortyCharacterPage>(cancellationToken: cancellationToken);
        return data ?? throw new InvalidOperationException("Respuesta vacía desde RickAndMorty API.");
    }

    public async Task<RickAndMortyCharacter> GetCharacterByIdAsync(int id, CancellationToken cancellationToken)
    {
        var response = await httpClient.GetAsync($"/api/character/{id}", cancellationToken);
        response.EnsureSuccessStatusCode();

        var data = await response.Content.ReadFromJsonAsync<RickAndMortyCharacter>(cancellationToken: cancellationToken);
        return data ?? throw new InvalidOperationException("Respuesta vacía desde RickAndMorty API.");
    }

}
