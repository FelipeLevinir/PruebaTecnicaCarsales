namespace Bff.Application.Characters;

public interface ICharacterService
{
    Task<CharacterPageDto> GetCharactersAsync(int page, CancellationToken cancellationToken);
    Task<CharacterDetailDto> GetCharacterByIdAsync(int id, CancellationToken cancellationToken);
}
