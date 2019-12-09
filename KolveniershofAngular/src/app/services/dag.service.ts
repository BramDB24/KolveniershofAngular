import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Atelier } from '../models/atelier.model';
import { DagAtelier } from '../models/dag-atelier.model';
import { DagPlanning } from '../models/dag-planning.model';
import { Gebruiker } from '../models/gebruiker.model';
import { PictoDag } from '../models/pictodag.model';

@Injectable({
  providedIn: 'root'
})
export class DagService {
  public huidigeGeselecteerdeDag: DagPlanning;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getDag(date: Date): Observable<DagPlanning> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http
      .get<DagPlanning>(`${environment.apiUrl}/dagplanning/${convertedDate}`)
      .pipe(
        map(x => {
          // er moeten een object.assign gebeuren omdat de mapping van json naar object automatisch gebeurd
          // op deze manier moet er geen constructors voorzien worden voor de mapping te laten slagen
          // echter moet er wel een 'echt' object gemaakt worden zodat we methodes normaal kunnen aanroepen
          // zonder expliciet new Class() te moeten doen
          this.huidigeGeselecteerdeDag = Object.assign(new DagPlanning(), x);
          this.huidigeGeselecteerdeDag.dagAteliers = x.dagAteliers.map(t =>
            Object.assign(new DagAtelier(), t)
          );
          return this.huidigeGeselecteerdeDag;
        })
      );
  }

  public putDagAtelier(id: number, dagAtelier: DagAtelier) {
    return this.http.put(
      `${environment.apiUrl}/dagplanning/${id}/dagatelier`,
      dagAtelier
    );
  }

  public getDagTemplate(weeknr: number, weekdag: number) {
    return this.http
      .get<DagPlanning>(
        `${environment.apiUrl}/dagplanning/vanWeek/${weeknr}/vandag/${weekdag}`
      )
      .pipe(
        map(x => {
          // er moeten een object.assign gebeuren omdat de mapping van json naar object automatisch gebeurd
          // op deze manier moet er geen constructors voorzien worden voor de mapping te laten slagen
          // echter moet er wel een 'echt' object gemaakt worden zodat we methodes normaal kunnen aanroepen
          // zonder expliciet new Class() te moeten doen
          this.huidigeGeselecteerdeDag = Object.assign(new DagPlanning(), x);
          this.huidigeGeselecteerdeDag.dagAteliers = x.dagAteliers.map(t =>
            Object.assign(new DagAtelier(), t)
          );
          return this.huidigeGeselecteerdeDag;
        })
      );
  }

  public getAteliers(): Observable<Array<Atelier>> {
    return this.http
      .get<Array<Atelier>>(`${environment.apiUrl}/atelier`)
      .pipe(map(x => x.sort((a, b) => a.naam.localeCompare(b.naam))));
  }

  public deleteAterlierUitDagplanning(datum, dagAtelier: DagAtelier) {
    return this.http.post(
      `${environment.apiUrl}/dagplanning/${datum}/dagateliers`,
      dagAtelier
    );
  }

  public deleteAterlierUitDagplanningTemplate(weeknr, weekdag, dagAtelier: DagAtelier) {
    console.log(dagAtelier);
    return this.http.post(`${environment.apiUrl}/dagplanning/week/${weeknr}/dag/${weekdag}/dagateliers`, dagAtelier);
  }

  public getAanwezigheidslijst(date: Date): Observable<DagAtelier[]> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<Array<DagAtelier>>(`${environment.apiUrl}/dagplanning/${convertedDate}/aanwezigen`);
  }

  //authorizatie: clients only
  public getPictoAgendas(date: Date, gebruikerId: string = null): Observable<PictoDag[]> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (gebruikerId != null)
      return this.http.get<Array<PictoDag>>(`${environment.apiUrl}/dagplanning/${convertedDate}/pictoagenda/client/${gebruikerId}`);
    return this.http.get<Array<PictoDag>>(`${environment.apiUrl}/dagplanning/${convertedDate}/pictoagenda`);
  }

}
