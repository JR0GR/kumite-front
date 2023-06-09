import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { User } from 'src/app/core/models/apiModels/user.model';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../storage/storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractService<User> {

  readonly url = environment.urlApi + environment.userEndpoint

  constructor(
    private storageService: StorageService,
    http: HttpClient
  ) {
    super(http);
  }

  saveMe() {
    this.storageService.removeItem('user')
    this.http.get<User>(this.url + 'me/').subscribe((user) => {
      this.storageService.setObject('user', user);
    })
  }

  async getMe() {
    return await this.storageService.getObject('user');
  }
}
