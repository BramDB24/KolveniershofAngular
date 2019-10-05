import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() date: Date;

  constructor() {
    this.date = new Date();
  }

  public changeDate(nr: number) : void {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() + nr
    )
  }

  public previousDate(): void {
    this.changeDate(-1);
  }

  public nextDate(): void {
    this.changeDate(+1);
  }

  ngOnInit() {

  }

}
