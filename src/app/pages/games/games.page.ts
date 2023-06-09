import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { GamesService } from 'src/app/core/services/api/games/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  games: Game[] = [];

  constructor(
    private gamesService: GamesService,
  ) { }

  onViewWillEnter() {
    this.gamesService.get().subscribe(res => this.games = res);
  }

  ngOnInit() {
  }

}
