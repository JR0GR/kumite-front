import { Injectable } from '@angular/core';
import {
    HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '../../models/requestOptions.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export abstract class AbstractService<T> {
    abstract readonly url: string;
    constructor(
        protected http: HttpClient,
        private authService: AuthService
    ) { }

    get<R = T[]>(
        options?: RequestOptions
    ): Observable<R> {
        return this.http.get<R>(`${this.url}`, options);
    }

    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.url}${id}/`);
    }

    async post(body: T): Promise<Observable<T>> {
        let auth_token = await this.authService.getToken()

        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`
                }
            ),
        };
        return this.http.post<T>(this.url + 'create/', body, httpOptions);
    }

    put(body: T, id: number): Observable<T> {
        return this.http.put<T>(`${this.url}${id}/`, body);
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.url}${id}/`);
    }
}
