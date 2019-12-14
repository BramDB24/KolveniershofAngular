import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PictoDag } from 'src/app/models/pictodag.model';
import { PictoAtelier } from 'src/app/models/pictoatelier.model';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { Commentaar } from 'src/app/models/commentaar.model';
import { CommentaarService } from 'src/app/services/commentaar.service';
import { finalize } from 'rxjs/operators';

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
  public tekstvak: string;
  public loader = true;

  constructor(private commentaarService: CommentaarService) {}

  ngOnInit() {
    this.getWeekendData();
  }

  get voormiddag(): PictoAtelier[] {
    return this.pictodag.ateliers.filter(
      a => a.dagMoment === 'Voormiddag' || a.dagMoment === 'VolledigeDag'
    );
  }

  get namiddag(): PictoAtelier[] {
    return this.pictodag.ateliers.filter(
      a => a.dagMoment === 'Namiddag' || a.dagMoment === 'VolledigeDag'
    );
  }

  public vulCommentaarOpZaterdag() {
    this.commentaarService
      .getCommentaarVanSpefiekeDagEnGebruiker(this.zaterdag)
      .pipe(
        finalize(() => {
          this.loader = false;
        })
      )
      .subscribe(commentaren => {
        console.log(commentaren)
        const commentaar = commentaren[0];
        if (commentaar != null) {
          this.zaterdagCommentaar = commentaar;
          this.getCommentaar(this.zaterdag);
        }
      });
  }

  public vulCommentaarOpZondag() {
    this.commentaarService
      .getCommentaarVanSpefiekeDagEnGebruiker(this.zondag)
      .pipe(
        finalize(() => {
          this.loader = false;
        })
      )
      .subscribe(commentaren => {
        const commentaar = commentaren.find(
          p => p.commentaartype === 'ZondagCommentaar'
        );
        if (commentaar != null) {
          this.zondagCommentaar = commentaar;
          this.getCommentaar(this.zondag);
        }
      });
  }

  public getCommentaar(datum: Date) {
    const dag = new Date(datum).getDay();
    if (dag === 6) {
      // zaterdag
      if (this.zaterdagCommentaar.tekst) {
        //const test = this.zaterdagCommentaar.tekst;
        console.log(this.zaterdagCommentaar);
        this.tekstvak = this.zaterdagCommentaar.tekst
      }
    } else if (dag === 0) {
      // zondag
      if (!this.zondagCommentaar.tekst) {
        this.tekstvak = this.zondagCommentaar.tekst
      }
    }
  }

  public opslaanCommentaar(pictodag: PictoDag) {
    const dag = new Date(pictodag.datum).getDay();
    let nieuwecommentaar;
    if (dag === 6) {
      // zaterdag
      console.log(this.tekstvak);
      if (this.zaterdagCommentaar.commentaarId) {
        nieuwecommentaar = {
          commentaarId: this.zaterdagCommentaar.commentaarId,
          datum: this.pictodag.datum,
          commentaartype: 'ZaterdagCommentaar',
          tekst: this.tekstvak
        };
        this.commentaarService
          .putCommentaar(nieuwecommentaar)
          .subscribe(response => {
            alert('Commentaar werd aangepast');
          });
      } else {
        nieuwecommentaar = {
          datum: this.pictodag.datum,
          commentaartype: 'ZaterdagCommentaar',
          tekst: this.tekstvak
        };
        this.commentaarService
          .postCommentaar(nieuwecommentaar)
          .subscribe(response => {
            alert('Commentaar werd toegevoegd');
          });
      }
    } else {
      // zondag
      console.log(this.tekstvak);
      if (this.zondagCommentaar.commentaarId) {
        nieuwecommentaar = {
          commentaarId: this.zondagCommentaar.commentaarId,
          datum: this.pictodag.datum,
          commentaartype: 'ZondagCommentaar',
          tekst: this.tekstvak
        };
        this.commentaarService
          .putCommentaar(nieuwecommentaar)
          .subscribe(response => {
            alert('Commentaar werd aangepast');
          });
      } else {
        nieuwecommentaar = {
          datum: this.pictodag.datum,
          commentaartype: 'ZondagCommentaar',
          tekst: this.tekstvak
        };
        this.commentaarService
          .postCommentaar(nieuwecommentaar)
          .subscribe(response => {
            alert('Commentaar werd toegevoegd');
          });
      }
    }
  }

  public getWeekendData() {
    const datum = new Date(this.pictodag.datum);
    if (datum.getDay() === 6) {
      this.zaterdag.setDate(datum.getDate());
      this.vulCommentaarOpZaterdag();
    } else if (datum.getDay() === 0) {
      this.zondag.setDate(datum.getDate());
      this.vulCommentaarOpZondag();
    }
  }
}
