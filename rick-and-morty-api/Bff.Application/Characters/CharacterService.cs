using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Characters;

public sealed class CharacterService(IRickAndMortyClient rickAndMortyClient) : ICharacterService
{
    public async Task<CharacterPageDto> GetCharactersAsync(int page, CancellationToken cancellationToken)
    {
        var apiPage = await rickAndMortyClient.GetCharactersAsync(page, cancellationToken);

        var items = apiPage.Results
            .Select(c => new CharacterListItemDto(
                Id: c.Id,
                Name: c.Name,
                Status: c.Status,
                Species: c.Species,
                Gender: c.Gender,
                Image: c.Image
            ))
            .ToList();

        return new CharacterPageDto(
            Page: page <= 0 ? 1 : page,
            TotalPages: apiPage.Info.Pages,
            TotalCount: apiPage.Info.Count,
            Items: items
        );
    }

    public async Task<CharacterDetailDto> GetCharacterByIdAsync(int id, CancellationToken cancellationToken)
    {
        var c = await rickAndMortyClient.GetCharacterByIdAsync(id, cancellationToken);

        return new CharacterDetailDto(
            Id: c.Id,
            Name: c.Name,
            Status: c.Status,
            Species: c.Species,
            Type: c.Type,
            Gender: c.Gender,
            OriginName: c.Origin?.Name ?? "",
            LocationName: c.Location?.Name ?? "",
            Image: c.Image,
            EpisodeCount: c.Episode?.Count ?? 0
        );
    }
}
