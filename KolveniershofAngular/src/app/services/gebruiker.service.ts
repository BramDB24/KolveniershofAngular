import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gebruiker } from '../interfaces/gebruiker.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>(`${environment.apiUrl}/account`);
  }




  // public getUser(id: number): Observable<Gebruiker>{
  //   return this.http.get<Gebruiker>(`localhost:4200/user/${id}`);
  // }

  //public getUserTypes(): Observable<string[]> {
  //  return this.http.get<string[]>(`localhost:4200/usertypes`);
  //}

  //public postUpdateGebruiker(gebruikerJson: any): Observable<{}> {
  //  return this.http.post(`localhost:4200/updateGebruiker`, gebruikerJson);
  //}

  //public postNieuweGebruiker(gebruikerJson: any): Observable<{}> {
  //  return this.http.post(`localhost:4200/addGebruiker`, gebruikerJson);
  //}
}
