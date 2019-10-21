import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDagPlanning } from '../interfaces/dag-planning';
import { Atelier } from '../models/atelier.model';
import { DagAtelier } from '../models/dag-atelier.model';
import { IDagAtelier } from '../interfaces/dag-atelier';

@Injectable({
  providedIn: 'root'
})
export class DagService {
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getDag(date: Date): Observable<IDagPlanning> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<IDagPlanning>(
      `${environment.apiUrl}/dagplanning/${convertedDate}`
    );
  }

  public putDagAtelier(id: number, dagAtelier: IDagAtelier) {
    return this.http.put(`${environment.apiUrl}/dagplanning/${id}`, dagAtelier);
  }

  public getAteliers(): Observable<Array<Atelier>> {
    return this.http.get<Array<Atelier>>(`${environment.apiUrl}/atelier`);
  }

  public deleteAterlierUitDagplanning(datum, dagAtelier: IDagAtelier) {
    return this.http.post(`${environment.apiUrl}/dagplanning/${datum}`, dagAtelier);
  }

}
