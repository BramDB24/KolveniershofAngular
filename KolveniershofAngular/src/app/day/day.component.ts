import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Day } from '../interfaces/day.interface';
import { DayService } from '../services/day.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() public dateTime: Date;
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
