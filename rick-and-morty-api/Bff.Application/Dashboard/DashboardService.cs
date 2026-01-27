using Bff.Application.Characters;
using Bff.Application.Episodes;
using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Dashboard;

public sealed class DashboardService(IRickAndMortyClient rickAndMortyClient) : IDashboardService
{
    public async Task<DashboardDto> GetDashboardAsync(CancellationToken cancellationToken)
    {
        var episodesPage = await rickAndMortyClient.GetEpisodesAsync(page: 1, cancellationToken);
        var charactersPage = await rickAndMortyClient.GetCharactersAsync(page: 1, cancellationToken);

        var latestEpisodes = episodesPage.Results
            .Take(5)
            .Select(e => new EpisodeListItemDto(
                Id: e.Id,
                Name: e.Name,
                Code: e.Episode,
                AirDate: e.Air_Date,
                CharacterCount: e.Characters?.Count ?? 0
            ))
            .ToList();

        var featuredCharacters = charactersPage.Results
            .Take(8)
            .Select(c => new CharacterListItemDto(
                Id: c.Id,
                Name: c.Name,
                Status: c.Status,
                Species: c.Species,
                Gender: c.Gender,
                Image: c.Image
            ))
            .ToList();

        return new DashboardDto(
            TotalEpisodes: episodesPage.Info.Count,
            TotalCharacters: charactersPage.Info.Count,
            LatestEpisodes: latestEpisodes,
            FeaturedCharacters: featuredCharacters
        );
    }
}
