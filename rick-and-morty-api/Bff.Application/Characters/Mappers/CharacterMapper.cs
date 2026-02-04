using Bff.Infrastructure.RickAndMorty;

namespace Bff.Application.Characters.Mappers;

    public interface ICharacterMapper
    {
        CharacterListItemDto ToListItem(RickAndMortyCharacter character);

        IReadOnlyList<CharacterListItemDto> ToListItems(IEnumerable<RickAndMortyCharacter> characters);

        CharacterPageDto ToPage(RickAndMortyCharacterPage apiPage, int requestedPage);

        CharacterDetailDto ToDetail(RickAndMortyCharacter character);
    }

public sealed class CharacterMapper : ICharacterMapper
{
    public CharacterListItemDto ToListItem(RickAndMortyCharacter character)
    {
        ArgumentNullException.ThrowIfNull(character);

        return new CharacterListItemDto(
            Id: character.Id,
            Name: character.Name,
            Status: character.Status,
            Species: character.Species,
            Gender: character.Gender,
            Image: character.Image
        );
    }

    public IReadOnlyList<CharacterListItemDto> ToListItems(IEnumerable<RickAndMortyCharacter> characters)
    {
        ArgumentNullException.ThrowIfNull(characters);

        return characters
            .Select(ToListItem)
            .ToList();
    }

    public CharacterPageDto ToPage(RickAndMortyCharacterPage apiPage, int requestedPage)
    {
        ArgumentNullException.ThrowIfNull(apiPage);

        var items = ToListItems(apiPage.Results);

        return new CharacterPageDto(
            Page: requestedPage <= 0 ? 1 : requestedPage,
            TotalPages: apiPage.Info.Pages,
            TotalCount: apiPage.Info.Count,
            Items: items
        );
    }

    public CharacterDetailDto ToDetail(RickAndMortyCharacter character)
    {
        ArgumentNullException.ThrowIfNull(character);

        return new CharacterDetailDto(
            Id: character.Id,
            Name: character.Name,
            Status: character.Status,
            Species: character.Species,
            Type: character.Type,
            Gender: character.Gender,
            OriginName: character.Origin?.Name ?? "",
            LocationName: character.Location?.Name ?? "",
            Image: character.Image,
            EpisodeCount: character.Episode?.Count ?? 0
        );
    }
}