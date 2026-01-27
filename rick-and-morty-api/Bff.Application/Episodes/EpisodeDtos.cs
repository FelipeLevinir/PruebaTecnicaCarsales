namespace Bff.Application.Episodes;

public sealed record EpisodeListItemDto(
    int Id,
    string Name,
    string Code,
    string AirDate,
    int CharacterCount
);

public sealed record EpisodePageDto(
    int Page,
    int TotalPages,
    int TotalCount,
    IReadOnlyList<EpisodeListItemDto> Items
);

public sealed record EpisodeDetailDto(
    int Id,
    string Name,
    string Code,
    string AirDate,
    IReadOnlyList<string> CharacterUrls
);
