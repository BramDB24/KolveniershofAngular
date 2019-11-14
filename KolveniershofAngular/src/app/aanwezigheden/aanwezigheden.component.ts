import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Atelier } from '../models/atelier.model';
import { DagAtelier } from '../models/dag-atelier.model';
import { DagService } from '../services/dag.service';
import { DagPlanning } from '../models/dag-planning.model';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Gebruiker } from '../models/gebruiker.model';

@Component({
  selector: 'app-aanwezigheden',
  templateUrl: './aanwezigheden.component.html',
  styleUrls: ['./aanwezigheden.component.scss']
})
export class AanwezighedenComponent implements OnInit {

  private _aanwezigheden$: Observable<Gebruiker[]>;
  private filterDate: Date = new Date();
  private filter$ = new Subject<Date>();
  

  constructor(private _dagService: DagService) { 
    this.filter$.pipe(
      distinctUntilChanged())
      .subscribe(
      val => {
        this.filterDate = val
        this.showDay();
      }
    )
  }

  get aanwezigheden$(){
    return this._aanwezigheden$;
  }

  get date(){
    return this.filterDate;
  }

 

  showDay(){
    this._aanwezigheden$ = this._dagService.getAanwezigheidslijst(this.filterDate);
  }

  ngOnInit() {
    this.showDay()
  }

}
