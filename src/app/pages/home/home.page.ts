import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { GamesService } from 'src/app/core/services/api/games/games.service';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

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
    private imagesService: ImagesService,
    private spinner: SpinnerVisibilityService
  ) { }

  async ionViewWillEnter() {
    await this.usersService.getMe().then((res) => {
      this.me = res;
    })
    await this.getFavorites();
    await this.getTournaments();
  }

  async getFavorites() {
    let favorites = []
    this.me.favourites.forEach((id) => {
      this.gamesService.getById(id).subscribe(async res => {
        res.base64 = await this.imagesService.getCacheImagen(res.imageId)
        favorites.push(res);
      });
    })
    this.favorites = favorites
  }

  async getTournaments() {
    let tournaments = [];
    let userTournaments = []
    this.tournamentsService.get().subscribe(res => {
      res.forEach(tournament => {
        if (!tournament.finished) {
          this.me.tournaments.includes(tournament.id) ? userTournaments.push(tournament) : tournaments.push(tournament)
        }
      });
      userTournaments.forEach(async (elem) => {
        elem.base64 = await this.imagesService.getCacheImagen(elem.imageId);
      })
      tournaments.forEach(async (elem) => {
        elem.base64 = await this.imagesService.getCacheImagen(elem.imageId)
      })
      this.tournaments = tournaments
      this.userTournaments = userTournaments
    })
  }

  ngOnInit() {
  }

}
