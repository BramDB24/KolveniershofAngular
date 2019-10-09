import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Day } from '../interfaces/day.interface';
import { User } from '../interfaces/user.interface';
import { DayService } from '../services/day.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnChanges {
  @Input() public datum: Date;
  public loadingError: HttpErrorResponse;
  public dag: Day;
  public loader = false;
  public aanwezigeLeden = new Array<User>();
  public afwezigeLeden = new Array<User>();

  constructor(private dagService: DayService) {}

  ngOnChanges() {
    console.log('onchange detection ' + this.datum);
    this.callApi(this.datum);
  }


  public callApi(date: Date): void {
    this.dagService
      .getDay(date)
      .pipe(
        finalize(() => {
          this.loader = true;
        })
      )
      .subscribe(
        day => {
          this.dag = day;
          this.readState(this.dag);
        },
        error => {
          this.loadingError = error;
        }
      );
  }

  public readState(dag: Day): void {
    if (dag.ziekte !== null) {
      this.afwezigeLeden = dag.ziekte.clienten;
    }
  }
}
