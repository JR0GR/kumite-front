import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { FavoritesService } from 'src/app/core/services/api/favorites/favorites.service';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {
  game: Game
  tournaments: Tournament[] = [];
  activeTournaments: Tournament[] = [];
  me: User;

  constructor(
    private router: Router,
    private tournamentsService: TournamentsService,
    private imagesService: ImagesService,
    private usersService: UsersService,
    private favoritesService: FavoritesService
  ) {
    this.game = this.router.getCurrentNavigation()?.extras?.state?.game;
  }

  async ionViewWillEnter() {
    if (!this.game) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return;
    }
    await this.usersService.getMe().then((res) => {
      this.me = res;
    })
    this.tournaments = [];
    this.activeTournaments = [];
    this.game.tournaments.forEach(id => {
      this.tournamentsService.getById(id).subscribe(async res => {
        console.log(res)
        res.base64 = await this.imagesService.getCacheImagen(res.imageId)
        res.finished ? this.tournaments.push(res) : this.activeTournaments.push(res);
        console.log(this.tournaments)
      })
    })
  }

  ngOnInit() {

  }

  addOrDeleteFavorite() {
    if (this.me?.favourites.includes(this.game.id)) {
      this.favoritesService.delete({ gameId: this.game.id, userId: this.me.id }).then(res => res.subscribe(res => {
        console.log(res)
        this.usersService.saveMe(true);
        this.me.favourites.splice(this.me.favourites.indexOf(this.game.id), 1)
      }))
    } else {
      this.favoritesService.post({ gameId: this.game.id, userId: this.me.id }).then(res => res.subscribe(res => {
        console.log(res)
        this.usersService.saveMe(true);
        this.me.favourites.push(this.game.id)
      }))
    }
  }

}
