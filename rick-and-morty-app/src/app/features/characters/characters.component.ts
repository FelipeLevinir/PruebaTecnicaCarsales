import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, EMPTY } from 'rxjs';
import { switchMap, finalize, catchError, tap } from 'rxjs/operators';

import { CharactersService } from '../../data-access/characters/characters.service';
import { CharacterDetailDto, CharacterListItemDto, CharacterPageDto } from '../../data-access/characters/characters.models';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

type PrimeTablePageEvent = { first: number; rows: number };

type SelectOption = { label: string; value: string };

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    TagModule,
    FormsModule
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  private readonly charactersService = inject(CharactersService);

  readonly loading = signal<boolean>(false);
  readonly pageData = signal<CharacterPageDto | null>(null);

  readonly page = signal<number>(1);
  readonly rows = signal<number>(20);

  readonly searchText = signal<string>('');
  readonly statusFilter = signal<string>('');
  readonly speciesFilter = signal<string>('');

  dialogOpen = false;
  readonly detailLoading = signal<boolean>(false);
  readonly selectedCharacter = signal<CharacterDetailDto | null>(null);

  private readonly loadPageRequests = new Subject<number>();

  readonly items = computed<CharacterListItemDto[]>(() => this.pageData()?.items ?? []);
  readonly totalCount = computed<number>(() => this.pageData()?.totalCount ?? 0);
  readonly totalPages = computed<number>(() => this.pageData()?.totalPages ?? 1);

  readonly statusOptions = computed<SelectOption[]>(() => {
    const values = new Set(this.items().map(x => x.status).filter(x => x.trim().length > 0));
    return [{ label: 'Todos', value: '' }, ...Array.from(values).sort().map(v => ({ label: v, value: v }))];
  });

  readonly speciesOptions = computed<SelectOption[]>(() => {
    const values = new Set(this.items().map(x => x.species).filter(x => x.trim().length > 0));
    return [{ label: 'Todos', value: '' }, ...Array.from(values).sort().map(v => ({ label: v, value: v }))];
  });

  readonly filteredItems = computed(() => {
    const query = this.searchText().trim().toLowerCase();
    const status = this.statusFilter();
    const species = this.speciesFilter();

    return this.items().filter(x => {
      const matchesText = query.length === 0 || x.name.toLowerCase().includes(query);
      const matchesStatus = status.length === 0 || x.status === status;
      const matchesSpecies = species.length === 0 || x.species === species;
      return matchesText && matchesStatus && matchesSpecies;
    });
  });

  constructor() {
    this.loadPageRequests.pipe(
      tap(() => this.loading.set(true)),
      switchMap((page) =>
        this.charactersService.getCharacters(page).pipe(
          tap((data) => {
            this.pageData.set(data);
            this.page.set(data.page); 
          }),
          catchError(() => {
            return EMPTY;
          }),
          finalize(() => this.loading.set(false))
        )
      )
    ).subscribe();

    this.loadPage(1);
  }

  loadPage(page: number): void {
    const safePage = Math.max(1, page);
    this.loadPageRequests.next(safePage);
  }

  onSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) this.searchText.set(target.value);
  }

  onPageChange(event: PrimeTablePageEvent): void {
    const rows = event.rows;
    const first = event.first;

    this.rows.set(rows);

    const nextPage = Math.floor(first / rows) + 1;

    // evita pedir páginas fuera de rango (sobre todo si totalPages cambia)
    const bounded = Math.min(Math.max(1, nextPage), this.totalPages());
    if (bounded !== this.page()) this.loadPage(bounded);
  }

  refresh(): void {
    this.loadPage(this.page());
  }

  openDetail(row: CharacterListItemDto): void {
    this.dialogOpen = true;
    this.selectedCharacter.set(null);
    this.detailLoading.set(true);

    this.charactersService.getCharacterById(row.id).pipe(
      catchError(() => {
        return EMPTY;
      }),
      finalize(() => this.detailLoading.set(false))
    ).subscribe((data) => this.selectedCharacter.set(data));
  }

  closeDetail(): void {
    this.dialogOpen = false;
    this.selectedCharacter.set(null);
    this.detailLoading.set(false);
  }

  severityForStatus(status: string): 'success' | 'info' | 'warning' | 'danger' {
    const normalized = status.toLowerCase();
    if (normalized === 'alive') return 'success';
    if (normalized === 'dead') return 'danger';
    return 'info';
  }
}