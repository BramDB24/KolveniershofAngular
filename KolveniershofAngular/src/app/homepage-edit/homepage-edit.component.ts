import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Atelier } from '../interfaces/atelier.interface';
import { DagPlanning } from '../interfaces/dag-planning';
import { User } from '../interfaces/user.interface';
import { DayService } from '../services/day.service';

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
  public loaded = false;
  public dagPlanning: DagPlanning;
  public atelier: Atelier;
  public dagmoment: string;
  public aanwezigen = new Array<User>();

  public state: State;
  StateType = State;

  constructor(private dayService: DayService) {}

  ngOnInit() {
    this.dayService
      .getDay(this.datum)
      .pipe(
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(entry => {
        this.dagPlanning = entry;
      });
  }

  public setAtelier(atelier: Atelier) {
    this.atelier = atelier;
    this.state = State.Edit;
  }

  public nieuwAtelier(dagmoment: string) {
    this.atelier = { naam: '', begeleider: [], clienten: [] };
    this.state = State.VoegToe;
    this.dagmoment = dagmoment;
  }
}
