import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DayService } from '../services/day.service';
import { Atelier } from '../interfaces/atelier.interface';
import { User, Rol } from '../interfaces/user.interface';
import { DayComponent } from '../day/day.component';
import { Day } from '../interfaces/day.interface';
import { UserService } from '../services/user.service';

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
  public dag: Day;
  public atelier: Atelier;
  public dagmoment: string;
  public clicked = false;
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
        this.dag = entry;
      });

    // this.dayService
    //   .veranderDag(this.dag)
    //   .pipe(
    //     finalize(() => {
    //       this.loaded = true;
    //     })
    //   );
  }

  public setAtelier(atelier: Atelier) {
    this.atelier = atelier;
    this.state = State.Edit;
    this.clicked = true;
  }

  public nieuwAtelier(dagmoment: string) {
    this.atelier = { naam: '', begeleider: [], clienten: [] };
    this.state = State.VoegToe;
    this.dagmoment = dagmoment;
    this.clicked = true;
  }
}
