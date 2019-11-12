import { Component, OnInit } from '@angular/core';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-picto-page',
  templateUrl: './picto-page.component.html',
  styleUrls: ['./picto-page.component.scss']
})
export class PictoPageComponent implements OnInit {

  public weekdagen = new Array<string>('Ma', 'Di', 'Woe', 'Do', 'Vr', 'Za', 'Zon');

  constructor() { }

  ngOnInit() {
   
  }


}
