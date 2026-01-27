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
