import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DagPlanning } from '../models/dag-planning.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  public postTemplate(naam: string): Observable<Template> {
    console.log(naam);
    return this.http.post<Template>(`${environment.apiUrl}/template`, JSON.parse(JSON.stringify({ naam: naam })));
  }

  public getAllTemplates(): Observable<Template[]>{
    return this.http.get<Template[]>(`${environment.apiUrl}/template`);
  }

  public deleteTemplate(id: number): Observable<Template> {
    return this.http.delete<Template>(`${environment.apiUrl}/template/${id}`);
  }

  public putTemplate(template: Template) {
    return this.http.put(`${environment.apiUrl}/template/${template.id}`, template);
  }
}
