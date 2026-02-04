using Bff.Application.Dashboard.Mappers;
using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Dashboard;

public sealed class DashboardService(
    IRickAndMortyClient rickAndMortyClient,
    IDashboardMapper dashboardMapper) : IDashboardService
{
    public async Task<DashboardDto> GetDashboardAsync(CancellationToken cancellationToken)
    {
        var episodesTask = rickAndMortyClient.GetEpisodesAsync(page: 1, cancellationToken);
        var charactersTask = rickAndMortyClient.GetCharactersAsync(page: 1, cancellationToken);

        await Task.WhenAll(episodesTask, charactersTask);

        var episodesPage = await episodesTask;
        var charactersPage = await charactersTask;

        return dashboardMapper.ToDashboard(episodesPage, charactersPage);
    }
}