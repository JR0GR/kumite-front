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
    this.favorites = [];
    this.tournaments = [];
    this.userTournaments = [];
    await this.usersService.getMe().then((res) => {
      this.me = res;
    })
    await this.getFavorites();
    await this.getTournaments();
  }

  async getFavorites() {
    this.me.favourites.forEach((id) => {
      this.gamesService.getById(id).subscribe(async res => {
        res.base64 = await this.imagesService.getCacheImagen(res.imageId)
        this.favorites.push(res);
      });
    })
  }

  async getTournaments() {
    this.tournamentsService.get().subscribe(res => {
      res.forEach(tournament => {
        if (!tournament.finished) {
          this.me.tournaments.includes(tournament.id) ? this.userTournaments.push(tournament) : this.tournaments.push(tournament)
        }
      });
      this.userTournaments.forEach(async (elem) => {
        elem.base64 = await this.imagesService.getCacheImagen(elem.imageId);
      })
      this.tournaments.forEach(async (elem) => {
        elem.base64 = await this.imagesService.getCacheImagen(elem.imageId)
      })
    })
  }

  ngOnInit() {
  }

}
