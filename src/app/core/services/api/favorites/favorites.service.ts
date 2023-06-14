import { Injectable } from '@angular/core';
import { Favorite } from 'src/app/core/models/apiModels/favorite.model';
import { environment } from 'src/environments/environment';
import { AbstractService } from '../abstract.service';
import { AuthService } from '../../auth/auth.service';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService extends AbstractService<Favorite> {
  readonly url = environment.urlApi + environment.favoriteEndpoint
}
