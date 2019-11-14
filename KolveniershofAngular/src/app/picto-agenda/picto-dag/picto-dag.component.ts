import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-picto-dag',
  templateUrl: './picto-dag.component.html',
  styleUrls: ['./picto-dag.component.scss']
})
export class PictoDagComponent implements OnInit {

  @Input() public isWeekend;

  constructor() { }

  ngOnInit() {
  }

}
