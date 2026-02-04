import { Injectable, inject } from '@angular/core';
import { EpisodesService } from '../episodes/episodes.service';
import { CharactersService } from '../characters/characters.service';
import { DashboardDto } from './dashboard.models';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly episodesService = inject(EpisodesService);
  private readonly charactersService = inject(CharactersService);

  getDashboard(): Observable<DashboardDto> {
    return forkJoin({
      episodes: this.episodesService.getEpisodes(1),
      characters: this.charactersService.getCharacters(1),
    }).pipe(
      map(({ episodes, characters }): DashboardDto => ({
        totalEpisodes: episodes.totalCount,
        totalCharacters: characters.totalCount,
        latestEpisodes: episodes.items.slice(0, 5),
        featuredCharacters: characters.items.slice(0, 6),
        backendStatus: 'OK',
        generatedAtIso: new Date().toISOString(),
      }))
    );
  }
}