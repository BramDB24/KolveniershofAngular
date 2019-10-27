import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IDagPlanning } from '../interfaces/dag-planning';
import { DagService } from '../services/dag.service';
import { DagMoment } from '../enums/dag-moment.enum';
import { AtelierType } from '../enums/atelier-type.enum';
import { DagAtelier } from '../models/dag-atelier.model';
import { DagPlanning } from '../models/dag-planning.model';

@Component({
  selector: 'app-dag',
  templateUrl: './dag.component.html',
  styleUrls: ['./dag.component.scss']
})
export class DagComponent implements OnChanges {

  @Input() public datum: Date;
  @Input() public geselecteerdeWeekdag: number;
  @Input() public geselecteerdeWeek: number;
  public loadingError: HttpErrorResponse;
  public dagplanning: IDagPlanning;
  public volledigeDag = new Array<DagAtelier>();
  public voormiddag = new Array<DagAtelier>();
  public namiddag = new Array<DagAtelier>();
  public specialeAteliers = new Array<DagAtelier>();


  constructor(private dagService: DagService) {
  }


  ngOnChanges() {
    if (this.datum == null) {
      this.haalDagplanningTemplateOpMetWeekdagEnWeek(this.geselecteerdeWeek, this.geselecteerdeWeekdag);
    }
    else { this.haalDagplanningOpMetDatum(this.datum); }
  }

  public haalDagplanningTemplateOpMetWeekdagEnWeek(week: number, weekdag: number) {
    this.dagService.getDagTemplate(week, weekdag).subscribe(
      dag => {
        this.dagplanning = new DagPlanning(dag);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      },
      ()=>{console.log("request complete")}
    )
  }

  public haalDagplanningOpMetDatum(date: Date): void {
    this.dagService.getDag(date).subscribe(
      dag => {
        this.dagplanning = new DagPlanning(dag);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      },
      ()=>{console.log("request complete")}
    );
  }

  public setDagMoment(): void {
    this.namiddag = this.dagplanning.getDagAteliersOpDagMoment(DagMoment.Namiddag);
    this.voormiddag = this.dagplanning.getDagAteliersOpDagMoment(DagMoment.Voormiddag);
    this.volledigeDag = this.dagplanning.getDagAteliersOpDagMoment(DagMoment.VolledigeDag);
    this.specialeAteliers = new Array<DagAtelier>();
    this.dagplanning.getDagAteliersOpDagMoment(DagMoment.Undefined)
      .forEach(entry => {
        if (entry.atelier.atelierType === AtelierType.Afwezig
          || entry.atelier.atelierType === AtelierType.Ziek
          || entry.atelier.atelierType === AtelierType.VervoerAtelier) {
          this.specialeAteliers.push(entry);
        }
      });
  }
}
