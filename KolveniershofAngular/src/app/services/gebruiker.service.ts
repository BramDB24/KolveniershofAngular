import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Gebruiker } from '../interfaces/gebruiker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>(`${environment.apiUrl}/account`);
  }




  public getGebruikerViaId(id: number): Observable<Gebruiker> {
    return this.http.get<Gebruiker>(`localhost:4200/viaId/${id}`);
  }

  public getGebruikerTypes(): Observable<string[]> {
    console.log('getGebruikerTypes');
    return of(['Admin', 'Begeleider', 'Cliënt']);
    //  return this.http.get<string[]>(`localhost:4200/usertypes`);
  }

  public postUpdateGebruiker(gebruikerJson: any): Observable<{}> {
    if (!gebruikerJson.id) {
      console.log('no id found');
      return null;
    }
    return this.http.post(`localhost:4200/${gebruikerJson.id}`, gebruikerJson);
  }

  public postNieuweGebruiker(gebruikerJson: any): Observable<{}> {
    return null;
    // WERKT NIET WERKT NIET ZIE API INFO
    // return this.http.post(`localhost:4200/register`, gebruikerJson);
  }
}
