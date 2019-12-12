import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PictoDag } from 'src/app/models/pictodag.model';
import { PictoAtelier } from 'src/app/models/pictoatelier.model';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { Commentaar } from 'src/app/models/commentaar.model';
import { CommentaarService } from 'src/app/services/commentaar.service';

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
  public zaterdagCommentaar = new Commentaar();
  public zondagCommentaar = new Commentaar();
  public zaterdag = new Date();
  public zondag = new Date();

  @ViewChild('tekst') tekstcommentaar: any;

  constructor(private commentaarService: CommentaarService) {
  }

  ngOnInit() {
    this.getWeekendData();
  }

  get voormiddag(): PictoAtelier[] {
    return this.pictodag.ateliers.filter(a => a.dagMoment === "Voormiddag" || a.dagMoment === "VolledigeDag");
  }

  get namiddag(): PictoAtelier[] {
    return this.pictodag.ateliers.filter(a => a.dagMoment === "Namiddag" || a.dagMoment === "VolledigeDag");

  }

  public vulCommentaarOpZaterdag() {
    this.commentaarService
    .getCommentaarVanSpefiekeDagEnGebruiker(this.zaterdag)
    .subscribe( commentaren => {
      let commentaar = commentaren.find(p => p.commentaartype === "ZaterdagCommentaar");
      this.zaterdagCommentaar = commentaar;
    });
  }

  public vulCommentaarOpZondag() {
    this.commentaarService
    .getCommentaarVanSpefiekeDagEnGebruiker(this.zondag)
    .subscribe( commentaren => {
      let commentaar = commentaren.find(p => p.commentaartype === "ZondagCommentaar");
      this.zondagCommentaar = commentaar;
    });
  }

  public getCommentaar(datum: Date): string {
    let dag = new Date(datum).getDay();
    if (dag === 6) {
      //zaterdag
      if(!this.zaterdagCommentaar.tekst) {
        return this.zaterdagCommentaar.tekst;
      }
    } else {
      //zondag
      if(!this.zondagCommentaar.tekst) {
      return this.zondagCommentaar.tekst;
      }
    }
  }

  public opslaanCommentaar(datum: PictoDag) {
    let dag = new Date(datum.datum).getDay();
    if (dag === 6) {
      //zaterdag
    } else {
      //zondag
    }
  }

  public getWeekendData() {
    let datum = new Date(this.pictodag.datum);
    if(datum.getDay() === 6) {
      this.zaterdag.setDate(datum.getDate());
      this.vulCommentaarOpZaterdag();
    } else {
      if(datum.getDay() === 0) {
        this.zondag.setDate(datum.getDate());
        this.vulCommentaarOpZondag();
      }
    }
  }

  // public getWeekendData() {
  //   let datum = new Date(this.pictodag.datum);
  //   switch(datum.getDay()) {
  //     case 1: {
  //       this.zaterdag.setDate(datum.getDate() + 5);
  //       this.zondag.setDate(datum.getDate() + 6);
  //       break;
  //     }
  //     case 2: {
  //       this.zaterdag.setDate(datum.getDate() + 4);
  //       this.zondag.setDate(datum.getDate() + 5);
  //       break;
  //     }
  //     case 3: {
  //       this.zaterdag.setDate(datum.getDate() + 3);
  //       this.zondag.setDate(datum.getDate() + 4);
  //       break;
  //     }
  //     case 4: {
  //       this.zaterdag.setDate(datum.getDate() + 2);
  //       this.zondag.setDate(datum.getDate() + 3);
  //       break;
  //     }
  //     case 5: {
  //       this.zaterdag.setDate(datum.getDate() + 1);
  //       this.zondag.setDate(datum.getDate() + 2);
  //       break;
  //     }
  //     case 6: {
  //       this.zaterdag.setDate(datum.getDate());
  //       this.zondag.setDate(datum.getDate() + 1);
  //       break;
  //     }
  //     case 0: {
  //       this.zaterdag.setDate(datum.getDate() - 1);
  //       this.zondag.setDate(datum.getDate());
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // }
}
