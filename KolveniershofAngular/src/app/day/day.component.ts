import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Day } from '../interfaces/day.interface';
import { DayService } from '../services/day.service';
import { User, stateClient } from '../interfaces/user.interface';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() public datum: Date;
  public dag: Day;
  public loader = false;
  public aanwezigeLeden = new Array<User>();
  public afwezigeLeden = new Array<User>();

  constructor(private dagService: DayService) {}

  ngOnInit() {
    this.dagService
      .getDay(this.datum)
      .pipe(
        finalize(() => {
          this.loader = true;
        })
      )
      .subscribe(day => {
        this.dag = day;
        this.readState(this.dag);
      });
  }

  public readState(dag: Day): void {
    dag.gebruikers.forEach(element => {
      switch (element.stateClient) {
        case stateClient.aanwezig:
          this.aanwezigeLeden.push(element);
          break;
        case stateClient.afwezig:
          this.afwezigeLeden.push(element);
          break;
      }
    });
  }
}
