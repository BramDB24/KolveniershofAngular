import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export enum State {
  Dag = 'dag',
  Edit = 'edit',
  Opmerkingen = 'opmerkingen'
}

@Component({
  selector: 'app-calendar',
  templateUrl: './kalender.component.html',
  styleUrls: ['./kalender.component.scss']
})
export class CalendarComponent implements OnInit {
  public datum: Date = new Date();

  public state = State.Dag;
  StateType = State;

  constructor(private _router: Router) {
    this.state = State.Dag;
  }

  public veranderState(type: State) {
    this.state = type;
  }

  public changeDate(nr: number): void {
    this.datum = new Date(
      this.datum.getFullYear(),
      this.datum.getMonth(),
      this.datum.getDate() + nr
    );
  }

  public previousDate(): void {
    this.changeDate(-1);
  }

  public nextDate(): void {
    this.changeDate(+1);
  }

  public redirect(route: string) {
    this._router.navigate([`${route}`]);
  }

  ngOnInit() {}
}
