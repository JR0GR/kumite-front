import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = null;
  token = null;
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
    return this.http.post(`${environment.urlApi}${environment.tokenEndpoint}`, {}, httpOptions);
  }

  register(data): Observable<any> {
    return this.http.post(`${environment.urlApi}/token`, data);
  }

  signOut(): void {
    this.user = null;
    this.token = null;
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
