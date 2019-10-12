import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../interfaces/gebruiker';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>(`${environment.apiUrl}/account`);
  }
}
