import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`localhost:4200/users`);
  }

  public getUser(id: number): Observable<User>{
    return this.http.get<User>(`localhost:4200/user/${id}`);
  }

  public getUserTypes(): Observable<string[]>{
    return this.http.get<string[]>(`localhost:4200/usertypes`);
  }
}
