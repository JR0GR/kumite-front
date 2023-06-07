import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { GameTournamentListModule } from 'src/app/components/game-tournament-list/game-tournament-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HeaderModule,
    GameTournamentListModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
