using Bff.Application.Episodes.Mappers;
using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Episodes;

public sealed class EpisodeService(
    IRickAndMortyClient rickAndMortyClient,
    IEpisodeMapper episodeMapper) : IEpisodeService
{
    public async Task<EpisodePageDto> GetEpisodesAsync(int page, CancellationToken cancellationToken)
    {
        var apiPage = await rickAndMortyClient.GetEpisodesAsync(page, cancellationToken);

        return episodeMapper.ToPage(apiPage, page);
    }

    public async Task<EpisodeDetailDto> GetEpisodeByIdAsync(int id, CancellationToken cancellationToken)
    {
        var episode = await rickAndMortyClient.GetEpisodeByIdAsync(id, cancellationToken);

        return episodeMapper.ToDetail(episode);
    }
}