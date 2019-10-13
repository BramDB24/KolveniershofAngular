import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DagAtelier } from '../interfaces/dag-atelier';
import { DagPlanning } from '../interfaces/dag-planning';
import { DagService } from '../services/dag.service';

@Component({
  selector: 'app-dag',
  templateUrl: './dag.component.html',
  styleUrls: ['./dag.component.scss']
})
export class DagComponent implements OnChanges {
  @Input() public datum: Date;
  public loadingError: HttpErrorResponse;
  public dagplanning: DagPlanning;
  public voormiddag = new Array<DagAtelier>();
  public namiddag = new Array<DagAtelier>();

  constructor(private dagService: DagService) {
  }

  ngOnChanges() {
    this.callApi(this.datum);
  }

  public callApi(date: Date): void {
    this.dagService.getDay(date).subscribe(
      day => {
        this.dagplanning = day;
        console.log(this.dagplanning);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      }
    );
  }

  public setDagMoment(): void {
    this.namiddag = new Array<DagAtelier>();
    this.voormiddag = new Array<DagAtelier>();
    this.dagplanning.dagAteliers.forEach(entry => {
      if (entry.dagMoment === 1) {
        this.voormiddag.push(entry);
      } else {
        this.namiddag.push(entry);
      }
    });
  }
}
