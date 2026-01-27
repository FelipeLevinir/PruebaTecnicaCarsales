import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../data-access/dashboard/dashboard.service';
import { DashboardDto } from '../../data-access/dashboard/dashboard.models';
import { EpisodeListItemDto } from '../../data-access/episodes/episodes.models';
import { CharacterListItemDto } from '../../data-access/characters/characters.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, TableModule, AvatarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly loading = signal<boolean>(false);
  readonly data = signal<DashboardDto | null>(null);

  readonly totalEpisodes = computed<number>(() => this.data()?.totalEpisodes ?? 0);
  readonly totalCharacters = computed<number>(() => this.data()?.totalCharacters ?? 0);
  readonly backendStatus = computed<'OK' | 'ERROR'>(() => this.data()?.backendStatus ?? 'ERROR');
  readonly generatedAt = computed<string>(() => this.data()?.generatedAtIso ?? '');

  readonly latestEpisodes = computed<EpisodeListItemDto[]>(() => this.data()?.latestEpisodes ?? []);
  readonly featuredCharacters = computed<CharacterListItemDto[]>(() => this.data()?.featuredCharacters ?? []);

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.dashboardService.getDashboard().subscribe({
      next: (d) => this.data.set(d),
      error: () => {},
      complete: () => this.loading.set(false),
    });
  }

  statusSeverity(): 'success' | 'danger' {
    return this.backendStatus() === 'OK' ? 'success' : 'danger';
  }
}
