import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Gebruiker } from '../models/gebruiker.model';
import { constructor } from 'q';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private readonly _tokenKey = 'currentUser';
    public user: BehaviorSubject<Gebruiker>;
    public huidigeGebruiker: Observable<Gebruiker>;
    public redirectUrl: string;

    constructor(private http: HttpClient) {
        let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
        if (parsedToken) {
            const expires =
                new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
            if (expires) {
                localStorage.removeItem(this._tokenKey);
                parsedToken = null;
            }
        }
        this.user = new BehaviorSubject<Gebruiker>(
            JSON.parse(localStorage.getItem('currentUser'))
        );
        this.huidigeGebruiker = this.user.asObservable();
    }

    public login(email: string, password: string): Observable<boolean> {
        return this.http
            .post(`${environment.apiUrl}/account`, { email, password })
            .pipe(
                map((token: any) => {
                    if (token) {
                        localStorage.setItem(this._tokenKey, JSON.stringify(token));
                        this.user.next(token);
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    public logout(): void {
        if (this.user.getValue()) {
            localStorage.removeItem('currentUser');
            this.user.next(null);
        }
    }
}

function parseJwt(token) {
    if (!token) {
        return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}
