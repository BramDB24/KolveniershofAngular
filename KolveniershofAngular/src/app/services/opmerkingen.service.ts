import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Opmerking } from '../models/opmerking';

@Injectable({
  providedIn: 'root'
})
export class OpmerkingenService {
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public GetOpmerkingenVanSpecifiekeDag$(date: Date): Observable<Opmerking[]> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<Opmerking[]>(
      `${environment.apiUrl}/Opmerking/opmerkingOp/${convertedDate}`
    );
  }

  public GetOpmerkingenVanSpecifiekeDagEnType$(date: Date, type: number): Observable<Opmerking[]> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<Opmerking[]>(
      `${environment.apiUrl}/Opmerking/opmerkingOp/${convertedDate}/typeOpmerking/${type}`
    );
  }

  public putOpmerking(opmerking) {
    return this.http.put(`${environment.apiUrl}/Opmerking/${opmerking.opmerkingId}`, opmerking);
  }
}
