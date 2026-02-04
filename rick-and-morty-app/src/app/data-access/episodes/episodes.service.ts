import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EpisodePageDto } from './episodes.models';
import { API_BASE_URL } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class EpisodesService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = inject(API_BASE_URL);

  getEpisodes(page: number): Observable<EpisodePageDto> {
    const params = new HttpParams().set('page', String(page));
    return this.httpClient.get<EpisodePageDto>(`${this.apiUrl}/episodes`, { params });
  }
}