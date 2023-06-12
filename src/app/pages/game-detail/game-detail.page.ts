import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';
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

  constructor(private router: Router, private tournamentsService: TournamentsService, private imagesService: ImagesService) {
    this.game = this.router.getCurrentNavigation()?.extras?.state?.game;
  }

  ionViewWillEnter() {
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

}
