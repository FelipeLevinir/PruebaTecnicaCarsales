import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterDetailDto, CharacterPageDto } from './characters.models';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly httpClient = inject(HttpClient);

  getCharacters(page: number): Observable<CharacterPageDto> {
    const params = new HttpParams().set('page', String(page));
    return this.httpClient.get<CharacterPageDto>('/api/characters', { params });
  }

  getCharacterById(id: number): Observable<CharacterDetailDto> {
    return this.httpClient.get<CharacterDetailDto>(`/api/characters/${id}`);
  }
}
