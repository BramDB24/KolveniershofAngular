import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../models/gebruiker.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GebruikerService {
    constructor(private http: HttpClient) {}

    public getUsers(): Observable<Gebruiker[]> {
        return this.http
            .get<Gebruiker[]>(`${environment.apiUrl}/account`)
            .pipe(
                map(x => x.sort((a, b) => a.voornaam.localeCompare(b.voornaam)))
            );
    }

    public getGebruikerViaId(id: string): Observable<Gebruiker> {
        return this.http.get<Gebruiker>(`${environment.apiUrl}/account/${id}`);
    }

    public getGebruikerTypes(): Observable<string[]> {
        return of(['Admin', 'Begeleider', 'Cliënt']);
    }

    public postUpdateGebruiker(gebruikerJson: any): Observable<{}> {
        if (!gebruikerJson.id) {
            return null;
        }
        return this.http.post(
            `localhost:4200/${gebruikerJson.id}`,
            gebruikerJson
        );
    }

    public postNieuweGebruiker(gebruikerJson: any): Observable<{}> {
        return null;
        // WERKT NIET WERKT NIET ZIE API INFO
        // return this.http.post(`${environment.apiUrl}/register`, gebruikerJson);
    }
}
