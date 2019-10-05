import { Component, OnInit } from '@angular/core';
import { Day } from '../interfaces/day.interface';
import { DayService } from '../services/day.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  public day: Day;
  public loader = false;

  constructor(private dayService: DayService) {}

  ngOnInit() {
    this.dayService
      .getDay('')
      .pipe(
        finalize(() => {
          this.loader = true;
        })
      )
      .subscribe(day => (this.day = day));
  }
}
