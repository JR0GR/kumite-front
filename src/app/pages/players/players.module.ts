import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersPageRoutingModule } from './players-routing.module';

import { PlayersPage } from './players.page';
import { HeaderModule } from "../../components/header/header.module";

@NgModule({
  declarations: [PlayersPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersPageRoutingModule,
    HeaderModule
  ]
})
export class PlayersPageModule { }
