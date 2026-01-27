export type CharacterListItemDto = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
};

export type CharacterPageDto = {
  page: number;
  totalPages: number;
  totalCount: number;
  items: CharacterListItemDto[];
};

export type CharacterDetailDto = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  originName: string;
  locationName: string;
  image: string;
  episodeCount: number;
};
