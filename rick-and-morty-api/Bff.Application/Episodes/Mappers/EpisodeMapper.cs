using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Episodes.Mappers;
    public interface IEpisodeMapper
    {

        EpisodeListItemDto ToListItem(RickAndMortyEpisode episode);

        IReadOnlyList<EpisodeListItemDto> ToListItems(IEnumerable<RickAndMortyEpisode> episodes);

        EpisodePageDto ToPage(RickAndMortyEpisodePage apiPage, int requestedPage);

        EpisodeDetailDto ToDetail(RickAndMortyEpisode episode);
    }

public sealed class EpisodeMapper : IEpisodeMapper
{
    public EpisodeListItemDto ToListItem(RickAndMortyEpisode episode)
    {
        ArgumentNullException.ThrowIfNull(episode);

        return new EpisodeListItemDto(
            Id: episode.Id,
            Name: episode.Name,
            Code: episode.Episode,
            AirDate: episode.Air_Date,
            CharacterCount: episode.Characters?.Count ?? 0
        );
    }

    public IReadOnlyList<EpisodeListItemDto> ToListItems(IEnumerable<RickAndMortyEpisode> episodes)
    {
        ArgumentNullException.ThrowIfNull(episodes);

        return episodes
            .Select(ToListItem)
            .ToList();
    }

    public EpisodePageDto ToPage(RickAndMortyEpisodePage apiPage, int requestedPage)
    {
        ArgumentNullException.ThrowIfNull(apiPage);

        var items = ToListItems(apiPage.Results);

        return new EpisodePageDto(
            Page: requestedPage <= 0 ? 1 : requestedPage,
            TotalPages: apiPage.Info.Pages,
            TotalCount: apiPage.Info.Count,
            Items: items
        );
    }

    public EpisodeDetailDto ToDetail(RickAndMortyEpisode episode)
    {
        ArgumentNullException.ThrowIfNull(episode);

        return new EpisodeDetailDto(
            Id: episode.Id,
            Name: episode.Name,
            Code: episode.Episode,
            AirDate: episode.Air_Date,
            CharacterUrls: episode.Characters
        );
    }
}