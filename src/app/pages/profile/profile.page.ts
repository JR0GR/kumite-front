import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { GamesService } from 'src/app/core/services/api/games/games.service';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  favorites: Game[] = [];
  tournaments: Tournament[] = [];
  regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  constructor(
    private router: Router,
    private gamesService: GamesService,
    private tournamentsService: TournamentsService,
  ) {
    this.user = this.router.getCurrentNavigation()?.extras?.state?.user;
  }

  ngOnInit() {
    if (!this.user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return;
    }
    console.log(this.user);
    this.user.favourites.forEach((id) => {
      this.gamesService.getById(id).subscribe(res => this.favorites.push(res));
    })
    this.user.tournaments.forEach((id) => {
      this.tournamentsService.getById(id).subscribe(res => this.tournaments.push(res));
    })
  }

}
