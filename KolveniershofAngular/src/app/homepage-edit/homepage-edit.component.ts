import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IDagPlanning } from '../interfaces/dag-planning';
import { DagService } from '../services/dag.service';
import { DagAtelier } from '../models/dag-atelier.model';
import { IDagAtelier } from '../interfaces/dag-atelier';
import { DagMoment } from '../enums/dag-moment.enum';
import { DagPlanning } from '../models/dag-planning.model';

// States worden gebruikt om te bepalen of een subcomponent getoond moet worden of niet
export enum State {
  Standard = 'standard',
  Edit = 'edit'
}

@Component({
  selector: 'app-homepage-edit',
  templateUrl: './homepage-edit.component.html',
  styleUrls: ['./homepage-edit.component.scss']
})
export class HomepageEditComponent implements OnInit {
  @Input() public datum: Date;
  public atelier: IDagAtelier;
  public loaded = false;
  public dagPlanning: IDagPlanning;
  public voormiddag = new Array<IDagAtelier>();
  public namiddag = new Array<IDagAtelier>();
  public volledigeDag = new Array<IDagAtelier>();
  public isEdit = false;
  public state = State.Standard;
  StateType = State;

  constructor(private dagService: DagService) { }

  ngOnInit() {
    this.dagService
      .getDag(this.datum)
      .pipe(
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(entry => {
        console.log(entry);
        this.dagPlanning = new DagPlanning(entry);
        this.setDagMoment();
      });
  }

  public setDagMoment(): void {
    this.namiddag = this.dagPlanning.getDagAteliersOpDagMoment(DagMoment.Namiddag);
    this.voormiddag = this.dagPlanning.getDagAteliersOpDagMoment(DagMoment.Voormiddag);
    this.volledigeDag = this.dagPlanning.getDagAteliersOpDagMoment(DagMoment.VolledigeDag);
  }
  public setAtelier(atelier: IDagAtelier) {
    this.atelier = atelier;
    this.isEdit = true;
    this.state = State.Edit;
  }

  public nieuwAtelier() {
    this.atelier = null;
    this.isEdit = false;
    this.state = State.Edit;
  }

  public deleteAtelierUitDagplanning(atelier, list) {
    if (confirm("Bent u zeker dat u dit atelier wilt verwijderen van de dagplanning?")) {

      this.dagService.deleteAterlierUitDagplanning(this.dagPlanning.datum, atelier).subscribe();

      var indexAteliers = this.dagPlanning.dagAteliers.indexOf(atelier);
      if (indexAteliers > -1) {
        this.dagPlanning.dagAteliers.splice(indexAteliers, 1);
      }

      var indexLijst = list.indexOf(atelier);
      if (indexLijst > -1) {
        list.splice(indexLijst, 1);
      }
    }
  }
}
