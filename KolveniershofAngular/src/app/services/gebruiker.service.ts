import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gebruiker } from '../interfaces/gebruiker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>(`${environment.apiUrl}/account`);
  }

  public getGebruikerViaId(id: number): Observable<Gebruiker> {
    console.log('getGebruikerViaId');
    return null;
    // return this.http.get<Gebruiker>(`localhost:4200/user/${id}`);
  }

  public getGebruikerTypes(): Observable<string[]> {
    console.log('getGebruikerTypes');
    return null;
    //  return this.http.get<string[]>(`localhost:4200/usertypes`);
  }

  public postUpdateGebruiker(gebruikerJson: any): Observable<{}> {
    console.log('postUpdateGebruiker');
    return null;
    //  return this.http.post(`localhost:4200/updateGebruiker`, gebruikerJson);
  }

  public postNieuweGebruiker(gebruikerJson: any): Observable<{}> {
    console.log('postNieuweGebruiker');
    return null;
    //  return this.http.post(`localhost:4200/addGebruiker`, gebruikerJson);
  }
}
