import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Il MainLayout agisce come "Shell", contiene Header, Footer e un router-outlet
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: '', // La rotta vuota (Home) viene caricata dentro il main-layout
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./features/pricing/pricing').then((m) => m.Pricing),
      },
    ],
  },
  {
    path: '**', // Rotta di fallback
    redirectTo: '',
  },
];
