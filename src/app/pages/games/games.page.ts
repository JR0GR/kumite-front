import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { GamesService } from 'src/app/core/services/api/games/games.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  me: User

  constructor(
    private gamesService: GamesService,
    private router: Router,
    private imagesService: ImagesService,
    private usersService: UsersService
  ) { }

  async ionViewWillEnter() {
    await this.usersService.getMe().then((res) => {
      this.me = res;
    })
    this.gamesService.get().subscribe(res => {
      this.games = res
      console.log(this.games)
      this.games.forEach(async game => {
        game.base64 = await this.imagesService.getCacheImagen(game.imageId)
      })
      this.filteredGames = this.games
    });
  }

  ngOnInit() {
  }

  goToDetail(game) {
    this.router.navigateByUrl('/game-detail', { state: { game: game } })
  }

  filterGames(value: string) {
    this.filteredGames = value ? this.games.filter(game => game.name.toLowerCase().includes(value.toLowerCase())) : this.games;
  }

}
