import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnChanges } from "@angular/core";
import { DagAtelier } from "../models/dag-atelier.model";
import { DagPlanning } from "../models/dag-planning.model";
import { DagService } from "../services/dag.service";

@Component({
  selector: "app-dag",
  templateUrl: "./dag.component.html",
  styleUrls: ["./dag.component.scss"]
})
export class DagComponent implements OnChanges {
  // Geeft ons de input van de het kalender component
  @Input() public datum: Date;
  @Input() public geselecteerdeWeekdag: number;
  @Input() public geselecteerdeWeek: number;
  public loadingError: HttpErrorResponse;
  public loading = false;
  public bool = false;
  public dagplanning: DagPlanning;
  public specialeAteliers = new Array<DagAtelier>();

  constructor(private dagService: DagService) {}

  ngOnChanges() {
    if (this.datum == null) {
      this.haalDagplanningTemplateOpMetWeekdagEnWeek(
        this.geselecteerdeWeek,
        this.geselecteerdeWeekdag
      );
    } else {
      this.haalDagplanningOpMetDatum(this.datum);
    }
  }

  public haalDagplanningTemplateOpMetWeekdagEnWeek(
    week: number,
    weekdag: number
  ) {
    this.dagService.getDagTemplate(week, weekdag).subscribe(
      dag => {
        this.dagplanning = Object.assign(new DagPlanning(), dag);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      },
      () => {
        this.loading = true;
      }
    );
  }

  public haalDagplanningOpMetDatum(date: Date) {
    this.dagService.getDag(date).subscribe(
      dag => {
        this.dagplanning = Object.assign(new DagPlanning(), dag);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      },
      () => {
        this.loading = true;
      }
    );
  }

  public setDagMoment(): void {
    this.dagplanning
      .getDagAteliersOpDagMoment('Undefined')
      .forEach(entry => {
        if (
          entry.atelier.atelierType === "Afwezig" ||
          entry.atelier.atelierType === "Ziek" ||
          entry.atelier.atelierType === "VervoerAtelier"
        ) {
          this.specialeAteliers.push(entry);
        }
      });
  }

  public toonSpecialeAteliers(): void {
    this.bool = !this.bool;
  }
}
