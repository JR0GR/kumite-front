import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/apiModels/game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {

  game = {
    name: 'Mortal Kombat 11',
    company: 'NetherRealm Studios',
    realeaseYear: '2019',
    platforms: ['PS5', 'XBOX', 'PC', 'Switch']
  }

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

}
