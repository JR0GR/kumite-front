import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTournamentPageRoutingModule } from './new-tournament-routing.module';

import { NewTournamentPage } from './new-tournament.page';
import { GameTournamentListModule } from 'src/app/components/game-tournament-list/game-tournament-list.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { InputModule } from 'src/app/components/form-components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewTournamentPageRoutingModule,
    HeaderModule,
    GameTournamentListModule,
    InputModule
  ],
  declarations: [NewTournamentPage]
})
export class NewTournamentPageModule { }
