import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
