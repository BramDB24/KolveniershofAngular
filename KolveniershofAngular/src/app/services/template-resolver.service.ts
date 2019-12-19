import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Template } from '../models/template';
import { Observable } from 'rxjs';
import { TemplateService } from './template.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateResolverService implements Resolve<Template[]> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Template[]> {
    return this.templateService.getAllTemplates();
  }

  constructor(private templateService: TemplateService) { }
}