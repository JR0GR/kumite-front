import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-tournament-list',
  templateUrl: './game-tournament-list.component.html',
  styleUrls: ['./game-tournament-list.component.scss'],
})
export class GameTournamentListComponent implements OnInit {
  @Input() label: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  goToDetail() {
    console.log('test')
    this.router.navigate(['/game-detail'])
  }
}
