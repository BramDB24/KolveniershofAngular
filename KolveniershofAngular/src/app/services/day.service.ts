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

  public getEditInformatie(): any {
    return this.http.get<any>('localhost:4200/homepage-edit')
  }
}
