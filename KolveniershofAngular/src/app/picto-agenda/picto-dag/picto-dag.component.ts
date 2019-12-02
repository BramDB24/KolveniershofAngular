import { Component, OnInit, Input } from '@angular/core';
import { PictoDag } from 'src/app/models/pictodag.model';
import { PictoAtelier } from 'src/app/models/pictoatelier.model';

@Component({
  selector: 'app-picto-dag',
  templateUrl: './picto-dag.component.html',
  styleUrls: ['./picto-dag.component.scss']
})
export class PictoDagComponent implements OnInit {

  //@Input() public isWeekend;
  @Input() public pictodag: PictoDag;
  public isWeekend: boolean = false;

  constructor() {

  }

  ngOnInit() {
      let day = new Date(this.pictodag.datum).getDay();
      if (day == 0 || day == 6) {
        this.isWeekend = true;
      }
    
  }

  get voormiddag(): PictoAtelier[] {
    return this.pictodag.ateliers.filter(a => a.dagMoment == "Voormiddag" || a.dagMoment == "VolledigeDag");
  }

  get namiddag() {
    return this.pictodag.ateliers.filter(a => a.dagMoment == "Namiddag" || a.dagMoment == "VolledigeDag");
  }
}
