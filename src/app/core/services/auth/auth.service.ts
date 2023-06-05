import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  usuario = null;
  token = null;
  tokenRefresh = null;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

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
    return this.http.post(`${environment.urlApi}/token`, {}, httpOptions);
  }

  register(data): Observable<any> {
    return this.http.post(`${environment.urlApi}/token`, data);
  }

  signOut(): void {
    this.usuario = null;
    this.token = null;
    this.tokenRefresh = null;
    this.storageService.clear();
    window.location.reload();
  }

  saveToken(token: string): void {
    this.token = token;
    this.storageService.removeItem(environment.tokenKey);
    this.storageService.setObject(environment.tokenKey, token);
  }

  async getToken(): Promise<string | null> {
    return await this.storageService.getObject(environment.tokenKey);
  }
}
