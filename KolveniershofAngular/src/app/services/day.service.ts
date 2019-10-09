import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Day } from '../interfaces/day.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private http: HttpClient) { }

  public getDay(day: Date): Observable<Day> {
    let date: string = day.toLocaleDateString();
    return this.http.get<any>(`${environment.apiUrl}/dagplanning/${date}`);
  }

  public getEditInformatie(): any {
    // needs to be refactored
    return this.http.get<any>('localhost:4200/homepage-edit')
  }
}
