import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.page.html',
  styleUrls: ['./tournament-detail.page.scss'],
})
export class TournamentDetailPage implements OnInit {
  users: User[] = [];
  tournament: Tournament;

  constructor(private usersService: UsersService, private router: Router, private imagesService: ImagesService) {
    this.tournament = this.router.getCurrentNavigation()?.extras?.state?.tournament;
  }

  ionViewWillEnter() {
    this.usersService.get().subscribe(res => {
      res.forEach(async user => {
        if (this.tournament.participants.includes(user.id)) {
          user.base64 = await this.imagesService.getCacheImagen(user.pictureId);
          this.users.push(user)
        }
      })
    })

  }

  ngOnInit() {
  }

}
