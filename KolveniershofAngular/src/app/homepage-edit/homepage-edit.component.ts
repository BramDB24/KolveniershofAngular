import { Component, OnInit } from '@angular/core';
import { DayService } from '../services/day.service';
import { finalize } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-homepage-edit',
  templateUrl: './homepage-edit.component.html',
  styleUrls: ['./homepage-edit.component.scss']
})
export class HomepageEditComponent implements OnInit {

  public loaded = false;
  public object : Object;
  constructor(private service : DayService) { }

  ngOnInit() {
    this.service.getEditInformatie().pipe(finalize(() => {this.loaded = true})).subscribe(entry => this.object = entry);
  }


}
