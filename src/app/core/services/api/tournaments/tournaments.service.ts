import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { Tournament } from 'src/app/core/models/apiModels/tournament.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Finish } from 'src/app/core/models/apiModels/finish.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService extends AbstractService<Tournament> {
  readonly url = environment.urlApi + environment.tournamentEndpoint

  constructor(
    http: HttpClient,
    authService: AuthService,
  ) {
    super(http, authService);
  }

  async finish(body: Finish): Promise<Observable<boolean>> {
    let auth_token = await this.authService.getToken()

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        }
      ),
    };
    return this.http.put<boolean>(this.url + 'finish/', body, httpOptions);
  }
}
