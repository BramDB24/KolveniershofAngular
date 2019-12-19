import { Component, OnInit, ViewChild } from '@angular/core';
import { DagService } from '../services/dag.service';
import { State } from '../homepage-edit/homepage-edit.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService } from '../services/template.service';
import { DagComponent } from '../dag/dag.component';
import { Template } from '../models/template';

@Component({
  selector: 'app-vierweekse-planning',
  templateUrl: './vierweekse-planning.component.html',
  styleUrls: ['./vierweekse-planning.component.scss']
})
export class VierweeksePlanningComponent implements OnInit {

  public geselecteerdeWeek: number = 1;
  //public weekdagen = ["Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag", "Maandag"];
  public weekdagen = ["Di", "Woe", "Do", "Vr", "Za", "Zo", "Ma"];
  public geselecteerdeWeekdag: string;
  public geselecteerdeWeekdagIndex: number;
  public state = State.Dag;

  //templates
  public huidigeTemplate: Template;
  public templates: Template[];
  public showNewTemplateInput = false;
  public newTemplateError = "";
  public errorMessage = "";


  // StateType gelijk stellen aan enum State, anders kan html hier niet aan
  StateType = State;

  constructor(private _templateService: TemplateService, private route: ActivatedRoute) {
    this.state = State.Dag;
  }

  ngOnInit() {
    this.route.data.subscribe(item =>{
      this.templates = item['templates'];
      this.toonActiefTemplate();
    },
    err => {
      this.newTemplateError = "Er liep iets fout bij het ophalen van de templates, probeer opnieuw."
      console.log(err);
    });
    this.geselecteerdeWeekdag = "Dinsdag";
    this.geselecteerdeWeekdagIndex = 1;
  }

  private getAllTemplates(): void {
    this._templateService.getAllTemplates().subscribe(val => {
      console.log(val);
      this.templates = val;
      console.log(this.templates);
      this.toonActiefTemplate();
    },
      err => {
        this.newTemplateError = "Er liep iets fout bij het ophalen van de templates, probeer opnieuw."
        console.log(err);
      });
  }

  public toonActiefTemplate() {
    console.log(this.templates);
    console.log(this.templates.filter(t => t.isActief));
    this.huidigeTemplate = this.templates.filter(t => t.isActief)[0];
    console.log(this.huidigeTemplate);
  }

  /**
   * selecteer het weeknummer voor de dagplanningtemplate
   * @param number 
   */
  //
  public selecteerWeek(number) {
    this.geselecteerdeWeek = number;
  }

  public createTemplate(naam: string) {
    console.log(naam);
    if (!naam || naam == "" || this.templates.map(t => t.naam).includes(naam)) {
      console.log('ja');
      this.newTemplateError = "Er is al een template met de ingegeven naam!";
      console.log(this.newTemplateError);
    }
    else {
      this._templateService.postTemplate(naam).subscribe(val => {
        this.templates.push(val)
        this.huidigeTemplate = val;
        this.newTemplateError = null;
      },
        err => {
          this.newTemplateError = "Er liep iets fout bij het creëren van de dagplanning, probeer opnieuw."
          console.log(err);
        });
    }
  }

  public switchNewTemplateVisibility() {
    this.showNewTemplateInput = !this.showNewTemplateInput;
  }

  /**
   * selecteer de weekdag (maandag of dinsdag of etc...) voor de dagplanningtemplate
   * gebruik i als de index van de array van weekdagen om later het correcte op te slaan 
   * in de db (omwille van enum)
   * @param weekdag 
   * @param i 
   */
  public selecteerWeekdag(weekdag, i) {
    this.geselecteerdeWeekdag = weekdag;
    this.geselecteerdeWeekdagIndex = i + 1;
    console.log(this.geselecteerdeWeekdag);
    console.log(this.geselecteerdeWeekdagIndex);
  }

  public deleteTemplate() {
    if (!this.huidigeTemplate.isActief && confirm("Bent u zeker dat u template '" + this.huidigeTemplate.naam + "' wilt verwijderen?"))
      this._templateService.deleteTemplate(this.huidigeTemplate.id).subscribe(val => {
        alert("template " + val.naam + " is succesvol verwijderd!");
      },
        err => {
          this.errorMessage = "Template kon niet verwijderd worden!";
          alert(this.errorMessage);
        }
      );
  }

  public activeerTemplate() : void {
    if(confirm(this.huidigeTemplate.naam + "nu activeren?")){
      this._templateService.putTemplate(this.huidigeTemplate).subscribe(val => {
        this.templates.filter(t => t.isActief)[0].isActief = false;
        this.huidigeTemplate.isActief = true;
      },
      err => {
        this.errorMessage = "Template kon niet geactiveerd worden!"
        alert(this.errorMessage);
      })
      
    }
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
