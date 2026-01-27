import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'episodes',
        loadComponent: () =>
          import('./features/episodes/episodes.component').then(m => m.EpisodesComponent),
      },
      {
        path: 'characters',
        loadComponent: () =>
          import('./features/characters/characters.component').then(m => m.CharactersComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
