import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { GamesService } from 'src/app/core/services/api/games/games.service';
import { TournamentsService } from 'src/app/core/services/api/tournaments/tournaments.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.page.html',
  styleUrls: ['./new-tournament.page.scss'],
})
export class NewTournamentPage implements OnInit {
  me: User;
  tournament: FormGroup;
  games: Game[] = [];
  photos = [];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private gamesService: GamesService,
    private imagesService: ImagesService,
    private actionSheetController: ActionSheetController,
    private tournamentsService: TournamentsService,
    private usersService: UsersService,
    private router: Router
  ) { }

  onViewWillEnter() {

  }

  async ngOnInit() {
    this.gamesService.get().subscribe(res => {
      this.games = res
      this.games.forEach(async game => {
        game.base64 = await this.imagesService.getCacheImagen(game.imageId)
      })
    });
    this.tournament = this.fb.group({
      game: ['', [Validators.required]],
      tournamentName: ['', [Validators.required]],
      image: ['', [Validators.required]],
    })
    await this.usersService.getMe().then((res) => {
      this.me = res;
    })
  }

  async createTournament() {
    try {
      this.tournament.controls['image'].setValue(await (await this.imagesService.uploadImage(this.photos[0])).title);
    } catch (e) {

    }
    console.log(this.tournament.value)
    if (!this.tournament.valid) {
      this.toastService.presentToast('All fields are required', false);
      return;
    }
    console.log({
      name: this.tournament.controls['tournamentName'].value,
      platforms: ["PC", "XBOX", "PS5", "Switch"],
      gameId: this.tournament.controls['game'].value,
      creatorId: this.me.id,
      imageId: this.tournament.controls['image'].value,
    })

    this.tournamentsService.post({
      name: this.tournament.controls['tournamentName'].value,
      platforms: ["PC", "XBOX", "PS5", "Switch"],
      gameId: this.tournament.controls['game'].value,
      creatorId: this.me.id,
      imageId: this.tournament.controls['image'].value,
    }).then(res => res.subscribe(res => {
      this.toastService.presentToast('Tournament created', true);
      this.router.navigateByUrl('/home', { replaceUrl: true })
    }))
  }

  image() {
    console.log('test');
  }

  gameSelected(value: number) {
    console.log(value)
    this.tournament.controls['game'].setValue(value);
  }

  async showOptionsCamera() {
    const actionSheet = await this.actionSheetController.create({
      header: 'You can upload only one image',
      mode: 'ios',
      cssClass: 'action-sheet-options',
      buttons: [
        {
          text: 'Camera',
          role: 'calculate',
          handler: () => {
            this.addPhotoToGallery(true);
          },
        },
        {
          text: 'Galery',
          role: 'edit',
          handler: () => {
            this.addPhotoToGallery(false);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async addPhotoToGallery(camera: boolean) {
    this.photos = [];
    if (camera === true) {
      const imagen = await this.imagesService.pickFromCamera();
      this.photos.push(imagen);
    } else {
      const imagenes = await this.imagesService.pickFromGallery(
      );
      if (imagenes !== null) {
        this.photos = [...imagenes];
      }
    }

    if (this.photos.length === 0) {
      this.toastService.presentToast('You can upload a maximum of 1 image. Try again.', false);
    }

  }



}
