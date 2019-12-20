import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { Observable, Subject, Subscription } from 'rxjs';
import { DagPlanning } from 'src/app/models/dag-planning.model';
import { DagService } from 'src/app/services/dag.service';
import { PictoDag } from 'src/app/models/pictodag.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentaarService } from 'src/app/services/commentaar.service';
import { Commentaar } from 'src/app/models/commentaar.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-picto-page',
  templateUrl: './picto-page.component.html',
  styleUrls: ['./picto-page.component.scss']
})
export class PictoPageComponent implements OnInit, OnDestroy {
  private _gebruiker: Gebruiker;
  private _subscription: Subscription;
  public dagpictos = new Array<string>(
    'maandag.jpg',
    'dinsdag.png',
    'woensdag.png',
    'donderdag.png',
    'vrijdag.png',
    'zaterdag.png',
    'zondag.png'
  );
  public filterDatum: Date = new Date();
  public filter$ = new Subject<Date>();
  public weekdagen: PictoDag[];
  public weekenddagen: PictoDag[];
  public loadingError: HttpErrorResponse;
  public loading: boolean;
  public commentaren: Array<Commentaar> = new Array<Commentaar>();
  public opgeslaan: string;
  public pictolijst = false;
  constructor(
    private _dagService: DagService,
    private _commentaarService: CommentaarService,
    private _accountService: AccountService
  ) {
    this.filter$.pipe(distinctUntilChanged()).subscribe(val => {
      this.filterDatum = val;
      if (!this.isZelfdeWeek(val)) {
        this.ophalenCommentaar();
        this.toonWeek();
      }
    });
  }

  /**
   * (Methode wordt geactiveerd wanneer de admin/begeleider een client kiest om
   * zijn pictoagenda raad te plegen.
   * De gebruiker wordt aangepast en zijn pictoagenda wordt getoond.
   */
  @Input() set gebruiker(gebruiker: Gebruiker) {
    this._gebruiker = gebruiker;
    this.pictolijst = true;
    this.ophalenCommentaar();
    this.toonWeek();
  }

  get titel(): string {
    if (this._gebruiker) {
      return `Pictoagenda van ${this._gebruiker.voornaam} ${this._gebruiker.achternaam}`;
    }
    return 'MIJN PICTOAGENDA';
  }

  get datum(): Date {
    return this.filterDatum;
  }

  geefVorigeDatum(): void {
    this.filter$.next(
      new Date(this.filterDatum.getTime() - 1000 * 60 * 60 * 24)
    );
  }

  geefVolgendeDatum(): void {
    this.filter$.next(
      new Date(this.filterDatum.getTime() + 1000 * 60 * 60 * 24)
    );
  }

  toonWeek() {
    let id = null;
    if (this._gebruiker) {
      id = this._gebruiker.id;
    }
    this._subscription = this._dagService
      .getPictoAgendas(this.filterDatum, id)
      .subscribe(
        val => {
          this.loading = true;
          if (val && val.length === 7) {
            this.weekdagen = val.slice(0, 5);
            this.weekenddagen = val.slice(5, 7);
          }
          this.loading = false;
        },
        error => {
          this.loadingError = error;
        }
      );
  }

  isZelfdeWeek(datum: Date): boolean {
    const weekdaynr = datum.getDay();
    switch (weekdaynr) {
      case 0:
        let zondag = new Date(this.weekenddagen[1].datum);
        return zondag.getDate() === datum.getDate();
      case 6:
        let zaterdag = new Date(this.weekenddagen[0].datum);
        return zaterdag.getDate() === datum.getDate();
      default:
        let weekdag = new Date(this.weekdagen[weekdaynr - 1].datum);
        return weekdag.getDate() === datum.getDate();
    }
  }

  ngOnInit() {
    if(!this._gebruiker) {
      this._accountService.huidigeGebruiker.subscribe( g => {
        this._gebruiker = g;
      });
    }
    this.ophalenCommentaar();
    this.toonWeek();
  }

  ophalenCommentaar() {
    this._commentaarService
      .getCommentaarVanSpefiekeDagEnGebruiker(this.getWeekendData(), this._gebruiker.id)
      .subscribe(t => {
        this.commentaren = t;
        if (!this.commentaren[0]) {
          this.commentaren[0] = new Commentaar();
          this.commentaren[0].datum = new Date(2014, 1, 1);
        }
        if (!this.commentaren[1]) {
          this.commentaren[1] = new Commentaar();
          this.commentaren[1].datum = new Date(2014, 1, 1);
        }
      });
  }

  getCommentaar(index: number) {
    return this.commentaren[index] != null
      ? this.commentaren[index].tekst
      : '';
  }

  // @output catch
  opslaanCommentaar(e: any) {
    let date = new Date(e.date);
    let nieuwecommentaar;
    if (this.commentaren[0].datum === e.date || this.commentaren[1].datum === e.date) {
      // put
      nieuwecommentaar = {
        commentaarId: date.getDay() === 6 ? this.commentaren[0].commentaarId : this.commentaren[1].commentaarId,
        datum: e.date,
        commentaartype: date.getDay() === 6 ? 'ZaterdagCommentaar' : 'ZondagCommentaar',
        tekst: e.commentaar
      };
      this._commentaarService
        .putCommentaar(nieuwecommentaar)
        .subscribe(response => {
          alert('Commentaar werd aangepast');
        });
    } else {
      // post
      nieuwecommentaar = {
        datum: e.date,
        commentaartype: date.getDay() === 6 ? 'ZaterdagCommentaar' : 'ZondagCommentaar',
        tekst: e.commentaar
      };
      this._commentaarService
        .postCommentaar(nieuwecommentaar)
        .subscribe(response => {
          alert('Commentaar werd toegevoegd');
        });
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  isSelected(dag: PictoDag) {
    return (
      new Date(dag.datum).toDateString() === this.filterDatum.toDateString()
    );
  }

  getWeekendData(): Array<Date> {
    const zaterdagOffset = 6 - this.filterDatum.getDay();
    let vandaag = new Date(this.filterDatum);
    let zondag = new Date();
    let dates: Date[] = [];
    if (zaterdagOffset === 6) {
      vandaag.setDate(vandaag.getDate() - 1);
      zondag.setDate(vandaag.getDate() + 1);
      dates.push(vandaag, zondag);
      return dates;
    } else if (zaterdagOffset !== 0) {
      vandaag.setDate(vandaag.getDate() + zaterdagOffset);
      zondag.setDate(vandaag.getDate() + 1);
      dates.push(vandaag, zondag);
      return dates;
    }
    zondag.setDate(vandaag.getDate() + 1);
    dates.push(vandaag, zondag);
    return dates;
  }
}
