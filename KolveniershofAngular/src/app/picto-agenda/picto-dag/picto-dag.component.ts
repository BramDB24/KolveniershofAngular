import { Component, OnInit, Input } from '@angular/core';
import { PictoDag } from 'src/app/models/pictodag.model';
import { PictoAtelier } from 'src/app/models/pictoatelier.model';

@Component({
  selector: 'app-picto-dag',
  templateUrl: './picto-dag.component.html',
  styleUrls: ['./picto-dag.component.scss']
})
export class PictoDagComponent implements OnInit {

  @Input() public pictodag: PictoDag;
  @Input() public dagImg: string;
  @Input() public isWeekend: boolean;
  @Input() public selected: boolean;

  constructor() {

  }

  ngOnInit() {
  }

  get voormiddag(): PictoAtelier[] {
    return this.pictodag.ateliers.filter(a => a.dagMoment == "Voormiddag" || a.dagMoment == "VolledigeDag");
  }

  get namiddag(): PictoAtelier[] {
    return this.pictodag.ateliers.filter(a => a.dagMoment == "Namiddag" || a.dagMoment == "VolledigeDag");

  }
}
