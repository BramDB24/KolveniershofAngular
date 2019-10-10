import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DagAtelier } from '../interfaces/dag-atelier';
import { DagPlanning } from '../interfaces/dag-planning';
import { DayService } from '../services/day.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnChanges {
  @Input() public datum: Date;
  public loadingError: HttpErrorResponse;
  public dagplanning: DagPlanning;
  public voormiddag = new Array<DagAtelier>();
  public namiddag = new Array<DagAtelier>();

  constructor(private dagService: DayService) {
  }

  ngOnChanges() {
    this.callApi(this.datum);
  }

  public callApi(date: Date): void {
    this.dagService.getDay(date).subscribe(
      day => {
        this.dagplanning = day;
        this.setDayMoment();
      },
      error => {
        this.loadingError = error;
      }
    );
  }

  public setDayMoment(): void {
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
