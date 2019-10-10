import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Day } from '../interfaces/day.interface';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private http: HttpClient) { }

  public getDay(day: Date): Observable<Day> {
    return this.http.get<Day>(`localhost:4200/date`);
  }

  public veranderDag(day: Day): Observable<Day> {
    return this.http.put<Day>(`localhost:4200/date`, day);
  }

  public getEditInformatie(): any {
    return this.http.get<any>('localhost:4200/homepage-edit')
  }
}
