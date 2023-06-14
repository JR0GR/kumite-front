import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { UserTournament } from 'src/app/core/models/apiModels/userTournament.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTournamentsService extends AbstractService<UserTournament> {
  readonly url = environment.urlApi + environment.userTournamentEndpoint

}
