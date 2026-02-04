import { Routes } from '@angular/router';
import { ShellComponent } from './shared/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'episodes',
        loadComponent: () => import('./features/episodes/episodes.component')
          .then(m => m.EpisodesComponent)
      },
      {
        path: 'characters',
        loadComponent: () => import('./features/characters/characters.component')
          .then(m => m.CharactersComponent)
      }
    ]
  }
];