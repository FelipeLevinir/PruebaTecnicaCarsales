using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Episodes;

public sealed class EpisodeService(IRickAndMortyClient rickAndMortyClient) : IEpisodeService
{
    public async Task<EpisodePageDto> GetEpisodesAsync(int page, CancellationToken cancellationToken)
    {
        var apiPage = await rickAndMortyClient.GetEpisodesAsync(page, cancellationToken);

        var items = apiPage.Results
            .Select(e => new EpisodeListItemDto(
                Id: e.Id,
                Name: e.Name,
                Code: e.Episode,
                AirDate: e.Air_Date,
                CharacterCount: e.Characters?.Count ?? 0
            ))
            .ToList();

        return new EpisodePageDto(
            Page: page <= 0 ? 1 : page,
            TotalPages: apiPage.Info.Pages,
            TotalCount: apiPage.Info.Count,
            Items: items
        );
    }

    public async Task<EpisodeDetailDto> GetEpisodeByIdAsync(int id, CancellationToken cancellationToken)
    {
        var e = await rickAndMortyClient.GetEpisodeByIdAsync(id, cancellationToken);

        return new EpisodeDetailDto(
            Id: e.Id,
            Name: e.Name,
            Code: e.Episode,
            AirDate: e.Air_Date,
            CharacterUrls: e.Characters
        );
    }
}
