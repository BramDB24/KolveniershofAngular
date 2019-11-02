import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Atelier } from '../models/atelier.model';
import { Observable } from 'rxjs';
import { IDagPlanning } from '../interfaces/dag-planning';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(private http: HttpClient) { }

  public postAtelier(atelier: Atelier) {
    return this.http.post(`${environment.apiUrl}/atelier/`, atelier);
  }


}
