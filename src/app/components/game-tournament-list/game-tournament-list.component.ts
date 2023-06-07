import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-tournament-list',
  templateUrl: './game-tournament-list.component.html',
  styleUrls: ['./game-tournament-list.component.scss'],
})
export class GameTournamentListComponent implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit() { }

}
