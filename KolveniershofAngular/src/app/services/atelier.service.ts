import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Atelier } from "../models/atelier.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AtelierService {
  constructor(private http: HttpClient) {}

  public postAtelier(atelier: Atelier) {
    return this.http.post(`${environment.apiUrl}/atelier`, atelier);
  }

  public getAteliers(): Observable<Array<Atelier>> {
    return this.http.get<Array<Atelier>>(`${environment.apiUrl}/atelier`);
  }

  public getAtelierViaId(atelierId: Number): Observable<Atelier> {
    return this.http.get<Atelier>(`${environment.apiUrl}/atelier/${atelierId}`);
  }

  public updateAtelier(atelier: Atelier) {
    if (!atelier.atelierId) {
      return null;
    }
    return this.http.put(
      `${environment.apiUrl}/atelier/${atelier.atelierId}`, atelier
    );
  }

  public deleteAtelier(atelierId: Number) {
    return this.http.delete(`${environment.apiUrl}/atelier/${atelierId}`);
  }
}
