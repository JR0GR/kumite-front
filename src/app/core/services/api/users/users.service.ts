import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { User } from 'src/app/core/models/apiModels/user.model';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../storage/storage.service';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { ImagesService } from '../../images/images.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractService<User> {

  readonly url = environment.urlApi + environment.userEndpoint

  constructor(
    private storageService: StorageService,
    http: HttpClient,
    authService: AuthService,
    private imagesService: ImagesService,
  ) {
    super(http, authService);
  }

  async saveMe(notRedirect?: true) {
    this.storageService.removeItem('user')
    this.http.get<User>(this.url + 'me/').subscribe(async (user) => {
      user.base64 = await this.imagesService.getCacheImagen(user.pictureId)
      console.log(user)
      this.storageService.setObject('user', user);
      if (notRedirect === true) {
        await this.authService.saveProfile(user.profileId, notRedirect)
      }
      else {
        await this.authService.saveProfile(user.profileId)
      }
    })
  }

  async getMe() {
    return await this.storageService.getObject('user');
  }

}
