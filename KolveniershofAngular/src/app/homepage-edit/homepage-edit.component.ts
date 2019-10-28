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
  public atelier: DagAtelier;
  public dagPlanning: DagPlanning;
  public isEdit = false;
  public state = State.Standard;
  StateType = State;
  loaded = true;
  constructor(private dagService: DagService) {
  }

  ngOnInit() {
    this.state = State.Standard;
    // in een vorig component hebben we api call gedaan naar een bepaalde datum
    // als we in dit component terecht komen weten we dat we de reeds opgehaalde dag willen aanpassen
    // ipv een nieuwe call te doen kunnen we dus hetzelfde object gebruiken
    this.dagPlanning = this.dagService.huidigeGeselecteerdeDag;
  }


  public setAtelier(atelier: DagAtelier) {
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
    if (
      confirm(
        'Bent u zeker dat u dit atelier wilt verwijderen van de dagplanning?'
      )
    ) {
      this.dagService
        .deleteAterlierUitDagplanning(this.dagPlanning.datum, atelier)
        .subscribe();

      let indexAteliers = this.dagPlanning.dagAteliers.indexOf(atelier);
      if (indexAteliers > -1) {
        this.dagPlanning.dagAteliers.splice(indexAteliers, 1);
      }

      let indexLijst = list.indexOf(atelier);
      if (indexLijst > -1) {
        list.splice(indexLijst, 1);
      }
    }
  }
}
