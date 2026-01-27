import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

type KpiCard = {
  title: string;
  value: string;
  icon: string;
  hint: string;
  tag: { label: string; severity: 'success' | 'info' | 'warning' | 'danger' };
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly kpis: KpiCard[] = [
    {
      title: 'Episodios',
      value: '—',
      icon: 'pi pi-video',
      hint: 'Total de episodios disponibles',
      tag: { label: 'BFF', severity: 'info' },
    },
    {
      title: 'Personajes',
      value: '—',
      icon: 'pi pi-users',
      hint: 'Total de personajes disponibles',
      tag: { label: 'Angular 19', severity: 'success' },
    },
    {
      title: 'Estado',
      value: 'OK',
      icon: 'pi pi-check-circle',
      hint: 'Comunicación frontend ↔ backend',
      tag: { label: 'Healthy', severity: 'success' },
    },
  ];
}
