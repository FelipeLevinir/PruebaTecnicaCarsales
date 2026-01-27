import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EpisodePageDto } from './episodes.models';

@Injectable({ providedIn: 'root' })
export class EpisodesService {
  private readonly httpClient = inject(HttpClient);

  getEpisodes(page: number): Observable<EpisodePageDto> {
    const params = new HttpParams().set('page', String(page));
    return this.httpClient.get<EpisodePageDto>('/api/episodes', { params });
  }
}
