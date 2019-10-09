import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public datum: Date;

  constructor(private _router: Router) {
    this.datum = new Date();
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
