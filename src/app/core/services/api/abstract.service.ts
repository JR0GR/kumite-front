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
        url: string = this.url,
        options?: RequestOptions,
        id?: number
    ): Observable<R> {
        return id ? this.http.get<R>(`${url}${id}`, options) : this.http.get<R>(`${url}`, options);
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
