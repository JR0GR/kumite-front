import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-game-tournament-list',
  templateUrl: './game-tournament-list.component.html',
  styleUrls: ['./game-tournament-list.component.scss'],
})
export class GameTournamentListComponent implements OnInit {
  @Input() label: string;
  @Input() type: 'games' | 'tournaments'
  @Input() data: any;
  @Input() select: boolean = false
  @Output() selected?= new EventEmitter<number>();

  gameSelected: number = null;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  goToDetail(data) {
    if (this.type == 'games') this.router.navigate(['/game-detail'], { state: { game: data } })
    else this.router.navigate(['/tournament-detail'], { state: { tournament: data } })
  }

  valueSelected(game: Game) {
    this.gameSelected = game.id
    this.selected.emit(game.id);
  }
}
