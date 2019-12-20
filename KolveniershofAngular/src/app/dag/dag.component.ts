import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { DagAtelier } from '../models/dag-atelier.model';
import { DagPlanning } from '../models/dag-planning.model';
import { DagService } from '../services/dag.service';
import { Gebruiker } from '../models/gebruiker.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-dag',
    templateUrl: './dag.component.html',
    styleUrls: ['./dag.component.scss'],
})
export class DagComponent implements OnChanges {

  // Geeft ons de input van de het kalender component
  @Input() public templateId: number;
  @Input() public datum: Date;
  @Input() public geselecteerdeWeekdag: number;
  @Input() public geselecteerdeWeek: number;
  public loadingError: HttpErrorResponse;
  public loading = false;
  public bool = false;
  public dagplanning: DagPlanning;
  public specialeAteliers = new Array<DagAtelier>();
  public commentaarForm: FormGroup;
    public submittedSave = false;


    constructor(private dagService: DagService, private builder: FormBuilder) {}


  ngOnChanges() {
    if (this.datum == null) {
      this.haalDagplanningTemplateOpMetWeekdagEnWeek(
        this.templateId,
        this.geselecteerdeWeek,
        this.geselecteerdeWeekdag
      );
    } else {
      this.haalDagplanningOpMetDatum(this.datum);
    }
  }

  public haalDagplanningTemplateOpMetWeekdagEnWeek(
    templateId: number,
    week: number,
    weekdag: number
  ) {
    this.dagService.getDagTemplate(templateId, week, weekdag).subscribe(
      dag => {
        this.dagplanning = Object.assign(new DagPlanning(), dag);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      },
      () => {
        this.initFormGroup();
        this.loading = true;
      }
    );
  }

    private initFormGroup(): void {
        this.commentaarForm = this.builder.group({
            opmerking: [
                !this.dagplanning.commentaar ? '' : this.dagplanning.commentaar,
                Validators.required
            ],
        });
    }

    public submit(): void {
        this.submittedSave = true;
        if (this.commentaarForm.invalid) {
            return;
        }
        this.dagService
            .updateDagCommentaar(
                this.dagplanning.dagplanningId,
                this.commentaarForm.controls.opmerking.value
            )
            .subscribe();
        alert('Informatie correct opgeslaan!');
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
                this.initFormGroup();
                this.loading = true;
            }
        );
    }

    public setDagMoment(): void {
        this.dagplanning
            .getDagAteliersOpDagMoment('Undefined')
            .forEach(entry => {
                if (
                    entry.atelier.atelierType === 'Afwezig' ||
                    entry.atelier.atelierType === 'Ziek' ||
                    entry.atelier.atelierType === 'VervoerAtelier'
                ) {
                    this.specialeAteliers.push(entry);
                }
            });
    }

    public toonSpecialeAteliers(): void {
        this.bool = !this.bool;
    }

  public toDeelnemerString(gebruikers: Gebruiker[]): String {
    var uitvoer = ""
    gebruikers.forEach(function (gebruiker, index) {
      uitvoer += gebruiker.voornaam.toUpperCase() + " ";
      if (index != (gebruikers.length - 1)) {
        uitvoer += "/ ";
      }
    });
    return uitvoer;
  }

  public showNewDagplanning(dagplanning: DagPlanning) : void {
    console.log(dagplanning);
    this.dagplanning = Object.assign(new DagPlanning(), dagplanning);
  }


    public opslaanCommentaar(): void {}

}
