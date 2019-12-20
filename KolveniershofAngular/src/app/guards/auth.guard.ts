import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Gebruiker } from '../models/gebruiker.model';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AccountService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const currentUser: Gebruiker = this.authService.user.value;
        if (currentUser) {
            if (next.data.roles && next.data.roles.indexOf(currentUser.type) === -1) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
