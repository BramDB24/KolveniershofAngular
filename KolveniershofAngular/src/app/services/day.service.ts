import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DagPlanning } from '../interfaces/dag-planning';
import { Atelier } from '../interfaces/atelier';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  public getDay(date: Date): Observable<DagPlanning> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<DagPlanning>(
      `${environment.apiUrl}/dagplanning/${convertedDate}`
    );
  }

  // public veranderDag(day: Day): Observable<Day> {
  //   return this.http.put<Day>(`localhost:4200/date`, day);
  // }

  public getEditInformatie(): Observable<Array<Atelier>> {
    return this.http.get<Array<Atelier>>(`${environment.apiUrl}/atelier`);
  }
}
