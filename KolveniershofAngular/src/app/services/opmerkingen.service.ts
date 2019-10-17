import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Opmerking } from '../interfaces/opmerking';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpmerkingenService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  GetOpmerkingenVanSpecifiekeDag$(date: Date): Observable<Opmerking[]> {
    const convertedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<Opmerking[]>(
      `${environment.apiUrl}/Opmerking/opmerkingOp/${convertedDate}`
    );
  }
}
