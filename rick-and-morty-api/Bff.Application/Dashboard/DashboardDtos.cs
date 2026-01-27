using Bff.Application.Characters;
using Bff.Application.Episodes;

namespace Bff.Application.Dashboard;

public sealed record DashboardDto(
    int TotalEpisodes,
    int TotalCharacters,
    IReadOnlyList<EpisodeListItemDto> LatestEpisodes,
    IReadOnlyList<CharacterListItemDto> FeaturedCharacters
);
