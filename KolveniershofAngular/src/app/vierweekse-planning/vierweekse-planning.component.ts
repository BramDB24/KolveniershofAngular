import { Component, OnInit } from '@angular/core';
import { DagService } from '../services/dag.service';
import { State } from '../homepage-edit/homepage-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vierweekse-planning',
  templateUrl: './vierweekse-planning.component.html',
  styleUrls: ['./vierweekse-planning.component.scss']
})
export class VierweeksePlanningComponent implements OnInit {

  public geselecteerdeWeek: number;
  //public weekdagen = ["Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag", "Maandag"];
  public weekdagen = ["Di", "Woe", "Do", "Vr", "Za", "Zo", "Ma"];
  public geselecteerdeWeekdag: string;
  public geselecteerdeWeekdagIndex: number;
  public state = State.Dag;
  // StateType gelijk stellen aan enum State, anders kan html hier niet aan
  StateType = State;

  constructor() {
    this.state = State.Dag;
  }

  ngOnInit() {
    this.geselecteerdeWeek = 1;
    this.geselecteerdeWeekdag = "Dinsdag";
    this.geselecteerdeWeekdagIndex = 1;
  }

  /**
   * selecteer het weeknummer voor de dagplanningtemplate
   * @param number 
   */
  //
  public SelecteerWeek(number) {
    this.geselecteerdeWeek = number;
  }

  /**
   * selecteer de weekdag (maandag of dinsdag of etc...) voor de dagplanningtemplate
   * gebruik i als de index van de array van weekdagen om later het correcte op te slaan 
   * in de db (omwille van enum)
   * @param weekdag 
   * @param i 
   */
  public SelecteerWeekdag(weekdag, i) {
    this.geselecteerdeWeekdag = weekdag;
    this.geselecteerdeWeekdagIndex = i + 1;
    console.log(this.geselecteerdeWeekdag);
    console.log(this.geselecteerdeWeekdagIndex);
  }

  /**
   * afhankelijk of je de dagplanningtemplate wilt raadplegen of aanpassen
   * moet je een andere component callen
   * hiervoor verander je de state
   * @param type 
   */
  public veranderState(type: State) {
    this.state = type;
  }
}
