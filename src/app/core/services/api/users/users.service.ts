import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractService<User> {

  readonly url = environment.urlApi + environment.userEndpoint
}
