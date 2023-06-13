import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import {
    catchError,
    from,
    Observable,
    switchMap,
    throwError,
} from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private toastService: ToastService, private storageService: StorageService, private router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {


        return from(this.authService.getToken()).pipe(switchMap(token => {
            if (token === null || request.url.includes(environment.tokenEndpoint) || request.url.includes(environment.imagesEndpoint) || request.url.includes('create')) return next.handle(request)

            request = request.clone({
                setHeaders: {
                    authorization: `Bearer ` + token,
                },
            });

            return next.handle(request).pipe(
                catchError((error) => {

                    return throwError(this.handleError(error));
                })
            );
        }));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 400) {
            this.toastService.presentToast('File is too big or there is a cookie error', false);
        } else if (error.status === 401) {
            this.storageService.clear();
            this.router.navigateByUrl('/login');
            this.toastService.presentToast('Error in log in', false);
        } else if (error.status === 403) {
            this.toastService.presentToast('Log in denied', false);
        } else if (error.status === 404) {
            this.toastService.presentToast('This URL is missing', false);
        } else if (error.status === 500) {
            this.toastService.presentToast('Sorry for the inconvenience, we are experiencing some troubles', false);
        } else if (error.status === 502) {
            this.toastService.presentToast('Failed to connect to the server', false);
        }

        return throwError(error);
    }

}

