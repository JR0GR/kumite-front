import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { GamesService } from 'src/app/core/services/api/games/games.service';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

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

  me: User;

  constructor(
    private router: Router,
    private gamesService: GamesService,
    private tournamentsService: TournamentsService,
    private imagesService: ImagesService,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras?.state?.user;
  }

  async ionViewWillEnter() {
    this.favorites = []
    this.tournaments = []
    if (!this.user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return;
    }
    await this.usersService.getMe().then((res) => {
      this.me = res
    })
    this.user.favourites.forEach((id) => {
      this.gamesService.getById(id).subscribe(async res => {
        res.base64 = await this.imagesService.getCacheImagen(res.imageId)
        this.favorites.push(res)
      });
    })
    this.user.tournaments.forEach((id) => {
      this.tournamentsService.getById(id).subscribe(async res => {
        if (!res.finished) {
          res.base64 = await this.imagesService.getCacheImagen(res.imageId)
          this.tournaments.push(res)
        }
      });
    })
  }

  ngOnInit() {

  }

  logout() {
    this.authService.signOut()
  }

}
