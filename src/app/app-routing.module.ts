import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'game-detail',
    loadChildren: () => import('./pages/game-detail/game-detail.module').then(m => m.GameDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'new-tournament',
    loadChildren: () => import('./pages/new-tournament/new-tournament.module').then(m => m.NewTournamentPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tournament-detail',
    loadChildren: () => import('./pages/tournament-detail/tournament-detail.module').then(m => m.TournamentDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
