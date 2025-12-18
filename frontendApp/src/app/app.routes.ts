import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'principal',
    loadComponent: () => import('./pages/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  {
    path: 'epocas',
    loadComponent: () => import('./pages/epocas/epocas.page').then( m => m.EpocasPage)
  },
  {
    path: 'personajes',
    loadComponent: () => import('./pages/personajes/personajes.page').then( m => m.PersonajesPage)
  },
  {
    path: 'selector-quiz',
    loadComponent: () => import('./pages/selector-quiz/selector-quiz.page').then( m => m.SelectorQuizPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'fechas',
    loadComponent: () => import('./pages/fechas/fechas.page').then( m => m.FechasPage)
  },
  {
    path: 'localizacion',
    loadComponent: () => import('./pages/localizacion/localizacion.page').then( m => m.LocalizacionPage)
  },
  {
    path: 'epoca-detalle',
    loadComponent: () => import('./pages/epoca-detalle/epoca-detalle.page').then( m => m.EpocaDetallePage)
  },
];
