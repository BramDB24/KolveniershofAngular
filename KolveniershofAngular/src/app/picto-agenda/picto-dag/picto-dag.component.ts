import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PictoDag } from 'src/app/models/pictodag.model';
import { PictoAtelier } from 'src/app/models/pictoatelier.model';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { Commentaar } from 'src/app/models/commentaar.model';

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
  public zaterdagCommentaar: Commentaar;
  public zondagCommentaar: Commentaar;

  @ViewChild('tekst') tekstcommentaar: any;

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

  public opslaanCommentaar(datum: PictoDag) {
    let dag = new Date(datum.datum).getDay();
    console.log(dag);
    if (dag === 6) {
      //zaterdag
    } else {
      //zondag
    }
  }
}
