import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Day } from '../interfaces/day.interface';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  public getDay(date: Date): Observable<Day> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<any>(
      `${environment.apiUrl}/dagplanning/${convertedDate}`
    );
  }

  public getEditInformatie(): any {
    // needs to be refactored
    return this.http.get<any>('localhost:4200/homepage-edit');
  }
}
