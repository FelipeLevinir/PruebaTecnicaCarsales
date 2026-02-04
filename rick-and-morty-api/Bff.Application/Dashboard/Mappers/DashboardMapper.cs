using Bff.Application.Episodes.Mappers;
using Bff.Application.Characters.Mappers;
using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Dashboard.Mappers;
    public interface IDashboardMapper
    {
        DashboardDto ToDashboard(
            RickAndMortyEpisodePage episodesPage,
            RickAndMortyCharacterPage charactersPage);
    }

public sealed class DashboardMapper(
    IEpisodeMapper episodeMapper,
    ICharacterMapper characterMapper) : IDashboardMapper
{
    public DashboardDto ToDashboard(
        RickAndMortyEpisodePage episodesPage,
        RickAndMortyCharacterPage charactersPage)
    {
        ArgumentNullException.ThrowIfNull(episodesPage);
        ArgumentNullException.ThrowIfNull(charactersPage);

        // Reutiliza los mappers existentes (evita duplicación)
        var latestEpisodes = episodeMapper
            .ToListItems(episodesPage.Results.Take(5))
            .ToList();

        var featuredCharacters = characterMapper
            .ToListItems(charactersPage.Results.Take(8))
            .ToList();

        return new DashboardDto(
            TotalEpisodes: episodesPage.Info.Count,
            TotalCharacters: charactersPage.Info.Count,
            LatestEpisodes: latestEpisodes,
            FeaturedCharacters: featuredCharacters
        );
    }
}