import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuth = await Preferences.get({ key: environment.tokenKey });
        if (!isAuth?.value) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
