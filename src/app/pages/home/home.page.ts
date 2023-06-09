import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { GamesService } from 'src/app/core/services/api/games/games.service';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  me: User;
  favorites: Game[] = [];
  tournaments: Tournament[] = [];
  userTournaments: Tournament[] = [];

  constructor(
    private usersService: UsersService,
    private gamesService: GamesService,
    private tournamentsService: TournamentsService,
  ) { }

  async ionViewWillEnter() {
    await this.usersService.getMe().then((res) => {
      this.me = res;
    })
    console.log(this.me)
    this.me.favourites.forEach((id) => {
      this.gamesService.getById(id).subscribe(res => this.favorites.push(res));
    })
    this.tournamentsService.get().subscribe(res => {
      res.forEach(tournament => this.me.tournaments.includes(tournament.id) ? this.userTournaments.push(tournament) : this.tournaments.push(tournament));
    })
  }

  ngOnInit() {

  }

}
