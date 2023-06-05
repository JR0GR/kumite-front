import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'games',
        loadChildren: () => import('../games/games.module').then(m => m.GamesPageModule)
      },
      {
        path: 'ranking',
        loadChildren: () => import('../ranking/ranking.module').then(m => m.RankingPageModule)
      },
      {
        path: 'players',
        loadChildren: () => import('../players/players.module').then(m => m.PlayersPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
