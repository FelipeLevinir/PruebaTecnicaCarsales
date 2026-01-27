namespace Bff.Application.Episodes;

public interface IEpisodeService
{
    Task<EpisodePageDto> GetEpisodesAsync(int page, CancellationToken cancellationToken);
    Task<EpisodeDetailDto> GetEpisodeByIdAsync(int id, CancellationToken cancellationToken);
}
