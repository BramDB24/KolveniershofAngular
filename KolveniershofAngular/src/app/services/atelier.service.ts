import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Atelier } from '../models/atelier.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(private http: HttpClient) { }

  public postAtelier(atelier: Atelier) {
    return this.http.post(`${environment.apiUrl}/atelier`, atelier
      // , {
      //   reportProgress: true,
      //   observe: 'events'
      // }
    );
  }

  public getAteliers(): Observable<Array<Atelier>> {
    return this.http.get<Array<Atelier>>(`${environment.apiUrl}/atelier`);
  }

  public deleteAtelier(atelierId: Number) {
    return this.http.delete(`${environment.apiUrl}/atelier/${atelierId}`);
  }


}
