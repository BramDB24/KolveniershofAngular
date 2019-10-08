import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Day } from '../interfaces/day.interface';
import { User } from '../interfaces/user.interface';
import { DayService } from '../services/day.service';

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
    if (dag.ziekte !== null) {
      this.afwezigeLeden = dag.ziekte.clienten;
    }
  }
}
