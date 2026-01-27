import { EpisodeListItemDto } from '../episodes/episodes.models';
import { CharacterListItemDto } from '../characters/characters.models';

export type DashboardDto = {
  totalEpisodes: number;
  totalCharacters: number;
  latestEpisodes: EpisodeListItemDto[];
  featuredCharacters: CharacterListItemDto[];
};
