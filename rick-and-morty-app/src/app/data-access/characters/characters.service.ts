import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterDetailDto, CharacterPageDto } from './characters.models';
import { API_BASE_URL } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = inject(API_BASE_URL);

  getCharacters(page: number): Observable<CharacterPageDto> {
    const params = new HttpParams().set('page', String(page));
    return this.httpClient.get<CharacterPageDto>(`${this.apiUrl}/characters`, { params });
  }

  getCharacterById(id: number): Observable<CharacterDetailDto> {
    return this.httpClient.get<CharacterDetailDto>(`${this.apiUrl}/characters/${id}`);
  }
}