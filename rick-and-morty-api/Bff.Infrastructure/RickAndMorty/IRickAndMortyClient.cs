namespace Bff.Infrastructure.RickAndMorty;

public interface IRickAndMortyClient
{
    Task<RickAndMortyEpisodePage> GetEpisodesAsync(int page, CancellationToken cancellationToken);
    Task<RickAndMortyEpisode> GetEpisodeByIdAsync(int id, CancellationToken cancellationToken);
}
