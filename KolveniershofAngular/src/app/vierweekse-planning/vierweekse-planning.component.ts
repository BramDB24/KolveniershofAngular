import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vierweekse-planning',
  templateUrl: './vierweekse-planning.component.html',
  styleUrls: ['./vierweekse-planning.component.scss']
})
export class VierweeksePlanningComponent implements OnInit {

  public geselecteerdeWeek: 0;
  public weekdagen = ["Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
  public geselecteerdeWeekdag: "Dinsdag";

  constructor() { }

  ngOnInit() {
  }

}
