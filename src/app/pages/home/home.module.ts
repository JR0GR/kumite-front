import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HeaderModule } from '../../components/header/header.module';
import { GameTournamentListModule } from 'src/app/components/game-tournament-list/game-tournament-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    GameTournamentListModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
