export type EpisodeListItemDto = {
  id: number;
  name: string;
  code: string;
  airDate: string;
  characterCount: number;
};

export type EpisodePageDto = {
  page: number;
  totalPages: number;
  totalCount: number;
  items: EpisodeListItemDto[];
};
