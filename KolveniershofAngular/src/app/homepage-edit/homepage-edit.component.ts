import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DagAtelier } from '../interfaces/dag-atelier';
import { DagPlanning } from '../interfaces/dag-planning';
import { DagService } from '../services/dag.service';

export enum State {
  Edit = 'edit',
  VoegToe = 'voegtoe'
}

@Component({
  selector: 'app-homepage-edit',
  templateUrl: './homepage-edit.component.html',
  styleUrls: ['./homepage-edit.component.scss']
})
export class HomepageEditComponent implements OnInit {
  @Input() public datum: Date;
  public atelier: DagAtelier;
  public loaded = false;
  public dagPlanning: DagPlanning;
  public voormiddag = new Array<DagAtelier>();
  public namiddag = new Array<DagAtelier>();
  public isEdit = false;
  public state: State;
  StateType = State;
  
  constructor(private dagService: DagService) {}

  ngOnInit() {
    this.dagService
      .getDag(this.datum)
      .pipe(
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(entry => {
        this.dagPlanning = entry;
        this.setDagMoment();
      });
  }

  public setDagMoment(): void {
    this.namiddag = new Array<DagAtelier>();
    this.voormiddag = new Array<DagAtelier>();
    this.dagPlanning.dagAteliers.forEach(entry => {
      if (entry.dagMoment === 1) {
        this.voormiddag.push(entry);
      } else {
        this.namiddag.push(entry);
      }
    });
  }
  public setAtelier(atelier: DagAtelier) {
    this.atelier = atelier;
    this.isEdit = true;
    this.state = State.Edit;
  }

  public nieuwAtelier() {
    this.atelier = null;
    this.isEdit = false;
    this.state = State.VoegToe;
  }
}
