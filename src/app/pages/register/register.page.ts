import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countriesDataOptions } from '../../core/utils/countriesDataOptions'
import { ImagesService } from 'src/app/core/services/images/images.service';
import { ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsersService } from 'src/app/core/services/api/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: FormGroup;
  countries = countriesDataOptions;
  photos = [];

  constructor(
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private actionSheetController: ActionSheetController,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.register = this.fb.group({
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      pictureId: ['', [Validators.required]],
    })
  }

  async registerUser() {
    console.log(this.photos[0])
    try {
      this.register.controls['pictureId'].setValue(await (await this.imagesService.uploadImage(this.photos[0])).title);
    } catch (e) { }
    if (!this.register.valid) {
      this.toastService.presentToast(this.register.controls['password'].value !== this.register.controls['confirmPassword'].value ? 'All fields are required and passwords must be the sames' : 'All fields are required', false);
      return;
    }
    const profileData = {
      name: this.register.controls['name'].value,
      email: this.register.controls['email'].value,
      password: this.register.controls['password'].value,
      phone: this.register.controls['phone'].value,
      admin: false,
      moderator: false,
      active: true,
    }

    let userData = {
      nickname: this.register.controls['nickname'].value,
      platforms: ["PC", "XBOX", "PS5", "Switch"],
      nationality: this.register.controls['nationality'].value,
      pictureId: this.register.controls['pictureId'].value,
      profileId: null
    }

    this.authService.register(profileData).subscribe(res => {
      userData.profileId = res.id
      this.authService.login({
        email: this.register.controls['name'].value,
        password: this.register.controls['password'].value,
      }).subscribe(async res => {
        this.authService.saveToken(res);
        this.usersService.post(userData).then(res => res.subscribe(res => {
          this.toastService.presentToast('User registered', true);
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }))
      })
    })
  }

  goToLogin() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
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
