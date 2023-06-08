import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameDetailPageRoutingModule } from './game-detail-routing.module';

import { GameDetailPage } from './game-detail.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { GameTournamentListModule } from 'src/app/components/game-tournament-list/game-tournament-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameDetailPageRoutingModule,
    HeaderModule,
    GameTournamentListModule
  ],
  declarations: [GameDetailPage]
})
export class GameDetailPageModule { }
