import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { Profile } from '../../models/apiModels/profile.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = null;
  token = null;
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    handler: HttpBackend,
    private router: Router
  ) {
    this.http = new HttpClient(handler);
  }

  login(credentials): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': "Basic " + btoa(`${credentials.email}:${credentials.password}`),
        }
      ),
      responseType: 'text' as 'text'
    };
    return this.http.post(`${environment.urlApi}${environment.tokenEndpoint}`, {}, httpOptions);
  }

  register(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      )
    };
    return this.http.post<any>(`${environment.urlApi}${environment.profileEndpoint}create`, data, httpOptions);
  }

  signOut(): void {
    this.user = null;
    this.token = null;
    this.storageService.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  saveToken(token: string): void {
    this.token = token;
    this.storageService.removeItem(environment.tokenKey);
    this.storageService.setObject(environment.tokenKey, token);
  }

  async getToken(): Promise<string | null> {
    let token = await this.storageService.getObject(environment.tokenKey)
    return token;
  }

  async saveProfile(id, notRedirect?: true) {
    this.storageService.removeItem('profile')
    this.http.get<Profile>(`${environment.urlApi}${environment.profileEndpoint}${id}`).subscribe(profile => {
      this.storageService.setObject('profile', profile);
      if (notRedirect !== true) {
        this.router.navigateByUrl('', { replaceUrl: true });
      }
    })
  }

  async myPrfoile() {
    return await this.storageService.getObject('profile');
  }
}
