import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService extends AbstractService<Tournament> {
  readonly url = environment.urlApi + environment.tournamentEndpoint

}
