import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AtelierType } from '../enums/atelier-type.enum';
import { DagMoment } from '../enums/dag-moment.enum';
import { DagAtelier } from '../models/dag-atelier.model';
import { DagPlanning } from '../models/dag-planning.model';
import { DagService } from '../services/dag.service';

@Component({
  selector: 'app-dag',
  templateUrl: './dag.component.html',
  styleUrls: ['./dag.component.scss']
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

  // Dit triggered wanneer de input van de datum veranderd, waneer deze veranderd moet er een nieuwe call gebeurd worden
  // Voor de nieuwe dag op te halen. de finalize() zorgt ervoor dat de html niet geladen kan worden alvorens de call afgerond is
  ngOnChanges() {
    this.dagService
      .getDag(this.datum)
      .pipe(finalize(() => (this.loading = true)))
      .subscribe(
        dag => {
          this.dagplanning = dag;
          this.setDagMoment();
        },
        error => {
          this.loadingError = error;
        }
      );
  }

  public setDagMoment(): void {
    this.dagplanning
      .getDagAteliersOpDagMoment(DagMoment.Undefined)
      .forEach(entry => {
        if (
          entry.atelier.atelierType === AtelierType.Afwezig ||
          entry.atelier.atelierType === AtelierType.Ziek ||
          entry.atelier.atelierType === AtelierType.VervoerAtelier
        ) {
          this.specialeAteliers.push(entry);
        }
      });
  }

  public toonSpecialeAteliers(): void {
    this.bool = !this.bool;
  }
}
