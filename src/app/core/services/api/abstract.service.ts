import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpContext,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '../../models/requestOptions.model';

@Injectable()
export abstract class AbstractService<T> {
    abstract readonly url: string;
    constructor(
        protected http: HttpClient,
    ) { }

    get<R = T[]>(
        options?: RequestOptions
    ): Observable<R> {
        return this.http.get<R>(`${this.url}`, options);
    }

    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.url}${id}/`);
    }

    post(body: T): Observable<T> {
        return this.http.post<T>(this.url, body);
    }

    put(body: T, id: number): Observable<T> {
        return this.http.put<T>(`${this.url}${id}/`, body);
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.url}${id}/`);
    }
}
