import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingPageRoutingModule } from './ranking-routing.module';

import { RankingPage } from './ranking.page';
import { HeaderModule } from "../../components/header/header.module";
import { PlayerListModule } from 'src/app/components/player-list/player-list.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';

@NgModule({
  declarations: [RankingPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingPageRoutingModule,
    HeaderModule,
    PlayerListModule,
  ]
})
export class RankingPageModule { }
