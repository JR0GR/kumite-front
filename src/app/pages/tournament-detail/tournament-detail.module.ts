import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentDetailPageRoutingModule } from './tournament-detail-routing.module';

import { TournamentDetailPage } from './tournament-detail.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { PlayerListModule } from 'src/app/components/player-list/player-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentDetailPageRoutingModule,
    HeaderModule,
    PlayerListModule,
  ],
  declarations: [TournamentDetailPage]
})
export class TournamentDetailPageModule { }
