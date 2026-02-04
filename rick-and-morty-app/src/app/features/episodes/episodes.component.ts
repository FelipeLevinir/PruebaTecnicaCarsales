import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesService } from '../../data-access/episodes/episodes.service';
import { EpisodeListItemDto, EpisodePageDto } from '../../data-access/episodes/episodes.models';

import { TableComponent, PageEvent } from '../../shared/components/table/table.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TagComponent } from '../../shared/components/tag/tag.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, TableComponent, InputComponent, ButtonComponent, TagComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css',
})
export class EpisodesComponent {
  private readonly episodesService = inject(EpisodesService);

  readonly loading = signal<boolean>(false);
  readonly pageData = signal<EpisodePageDto | null>(null);

  readonly page = signal<number>(1);
  readonly rows = signal<number>(20);
  readonly searchText = signal<string>('');

  readonly items = computed<EpisodeListItemDto[]>(() => this.pageData()?.items ?? []);
  readonly totalCount = computed<number>(() => this.pageData()?.totalCount ?? 0);
  readonly totalPages = computed<number>(() => this.pageData()?.totalPages ?? 1);

  readonly filteredItems = computed(() => {
    const query = this.searchText().trim().toLowerCase();
    if (query.length === 0) return this.items();
    return this.items().filter(x => x.name.toLowerCase().includes(query));
  });

  constructor() {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    this.page.set(page);

    this.episodesService.getEpisodes(page).subscribe({
      next: (data) => this.pageData.set(data),
      complete: () => this.loading.set(false),
    });
  }

  onSearch(value: string): void {
    this.searchText.set(value);
  }

  onPageChange(event: PageEvent): void {
    const rows = event.rows;
    const first = event.first;

    this.rows.set(rows);

    const nextPage = Math.floor(first / rows) + 1;
    if (nextPage !== this.page()) {
      this.loadPage(nextPage);
    }
  }

  refresh(): void {
    this.loadPage(this.page());
  }
}