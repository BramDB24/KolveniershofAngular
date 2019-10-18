import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IOpmerking } from '../interfaces/opmerking';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpmerkingenService {
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public GetOpmerkingenVanSpecifiekeDag$(date: Date): Observable<IOpmerking[]> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<IOpmerking[]>(
      `${environment.apiUrl}/Opmerking/opmerkingOp/${convertedDate}`
    );
  }

  public GetOpmerkingenVanSpecifiekeDagEnType$(date: Date, type: number): Observable<IOpmerking[]> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<IOpmerking[]>(
      `${environment.apiUrl}/Opmerking/opmerkingOp/${convertedDate}/typeOpmerking/${type}`
    );
  }

  public postOpmerking(id, opmerking) {
    console.log(opmerking);
    console.log(id);
    return this.http.put(`${environment.apiUrl}/Opmerking/${id}`, opmerking).pipe(
      tap(x=>console.log("requst done")),
      catchError(err => {
        console.log(err);
        return of([]);
      })
      );
  }
}
