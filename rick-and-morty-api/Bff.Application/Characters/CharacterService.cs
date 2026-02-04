using Bff.Application.Characters.Mappers;
using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Characters;

public sealed class CharacterService(
    IRickAndMortyClient rickAndMortyClient,
    ICharacterMapper characterMapper) : ICharacterService
{
    public async Task<CharacterPageDto> GetCharactersAsync(int page, CancellationToken cancellationToken)
    {
        var apiPage = await rickAndMortyClient.GetCharactersAsync(page, cancellationToken);

        return characterMapper.ToPage(apiPage, page);
    }

    public async Task<CharacterDetailDto> GetCharacterByIdAsync(int id, CancellationToken cancellationToken)
    {
        var character = await rickAndMortyClient.GetCharacterByIdAsync(id, cancellationToken);

        return characterMapper.ToDetail(character);
    }
}