namespace Bff.Infrastructure.RickAndMorty;

public sealed record RickAndMortyPageInfo(
    int Count,
    int Pages,
    string? Next,
    string? Prev
);

public sealed record RickAndMortyEpisode(
    int Id,
    string Name,
    string Air_Date,
    string Episode,
    IReadOnlyList<string> Characters,
    string Url,
    DateTime Created
);

public sealed record RickAndMortyEpisodePage(
    RickAndMortyPageInfo Info,
    IReadOnlyList<RickAndMortyEpisode> Results
);

public sealed record RickAndMortyCharacterLocation(
    string Name,
    string Url
);

public sealed record RickAndMortyCharacter(
    int Id,
    string Name,
    string Status,
    string Species,
    string Type,
    string Gender,
    RickAndMortyCharacterLocation Origin,
    RickAndMortyCharacterLocation Location,
    string Image,
    IReadOnlyList<string> Episode,
    string Url,
    DateTime Created
);

public sealed record RickAndMortyCharacterPage(
    RickAndMortyPageInfo Info,
    IReadOnlyList<RickAndMortyCharacter> Results
);