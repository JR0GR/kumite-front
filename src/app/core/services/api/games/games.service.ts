import { Injectable } from '@angular/core';
import { Game } from 'src/app/core/models/apiModels/game.model';
import { environment } from 'src/environments/environment';
import { AbstractService } from '../abstract.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends AbstractService<Game> {
  readonly url = environment.urlApi + environment.gameEndpoint

}
