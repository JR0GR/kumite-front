import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Profile } from 'src/app/core/models/apiModels/profile.model';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UserTournamentsService } from 'src/app/core/services/api/userTournaments/user-tournaments.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ImagesService } from 'src/app/core/services/images/images.service';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.page.html',
  styleUrls: ['./tournament-detail.page.scss'],
})
export class TournamentDetailPage implements OnInit {
  users: User[] = [];
  tournament: Tournament;
  me: User;
  myProfile: Profile;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private imagesService: ImagesService,
    private userTournamentsService: UserTournamentsService,
    private authService: AuthService,
    private alertController: AlertController,
    private tournamentsService: TournamentsService
  ) {
    this.tournament = this.router.getCurrentNavigation()?.extras?.state?.tournament;
  }

  async ionViewWillEnter() {
    this.users = []
    if (!this.tournament) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return;
    }
    await this.usersService.getMe().then((res) => {
      this.me = res;
    })
    await this.authService.myPrfoile().then((res) => {
      this.myProfile = res;
    })
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

  joinTournament() {
    this.userTournamentsService.post({ tournamentId: this.tournament.id, userId: this.me.id }).then(res => res.subscribe(res => {
      this.usersService.saveMe(true);
      this.tournament.participants.push(this.me.id)
      this.usersService.get().subscribe(res => {
        res.forEach(async user => {
          if (this.tournament.participants.includes(user.id)) {
            user.base64 = await this.imagesService.getCacheImagen(user.pictureId);
            this.users.push(user)
          }
        })
      })
    }))
  }

  async presentAlert() {
    let inputs = []
    this.users.forEach(user => inputs.push({ label: user.nickname, type: 'radio', value: user.id }))
    const alert = await this.alertController.create({
      header: 'Select a winner',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      inputs: inputs,
      mode: 'ios',

    });

    await alert.present();

    alert.onDidDismiss().then((event) => {
      if (event.role === 'confirm' && event.data.values) {
        this.tournamentsService.finish({ tournamentId: this.tournament.id, userId: event.data.values }).then(res => res.subscribe(res => {
          this.usersService.saveMe(true);
          this.me.wins = this.me.wins + 1
          this.tournament.finished = true
          this.users.forEach(user => {
            if (user.id === event.data.values) {
              user.wins = user.wins + 1
            }
          })
        }))
      }

    })
  }

}
