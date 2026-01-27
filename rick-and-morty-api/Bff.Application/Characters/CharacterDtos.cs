namespace Bff.Application.Characters;

public sealed record CharacterListItemDto(
    int Id,
    string Name,
    string Status,
    string Species,
    string Gender,
    string Image
);

public sealed record CharacterPageDto(
    int Page,
    int TotalPages,
    int TotalCount,
    IReadOnlyList<CharacterListItemDto> Items
);

public sealed record CharacterDetailDto(
    int Id,
    string Name,
    string Status,
    string Species,
    string Type,
    string Gender,
    string OriginName,
    string LocationName,
    string Image,
    int EpisodeCount
);
