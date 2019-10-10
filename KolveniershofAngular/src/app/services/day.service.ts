import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DagPlanning } from '../interfaces/dag-planning';

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

  public getEditInformatie(): any {
    // needs to be refactored
    return this.http.get<any>('localhost:4200/homepage-edit');
  }
}
