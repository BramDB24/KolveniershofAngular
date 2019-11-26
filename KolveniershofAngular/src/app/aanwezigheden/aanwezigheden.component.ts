import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import { DagService } from '../services/dag.service';
import { distinctUntilChanged} from 'rxjs/operators';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-aanwezigheden',
  templateUrl: './aanwezigheden.component.html',
  styleUrls: ['./aanwezigheden.component.scss']
})
export class AanwezighedenComponent implements OnInit {

  private filterDatum: Date = new Date();
  private subscription: Subscription;
  public filter$ = new Subject<Date>();
  public voormiddag = new MatTableDataSource<any>();
  public namiddag = new MatTableDataSource<any>();
  public volledigeDag = new MatTableDataSource<any>();
  public kolomheaders: string[] = ['#', 'voornaam', 'achternaam', 'reden'];

  @ViewChild('table1', {read: MatSort}) sort: MatSort;
  @ViewChild('table2', {read: MatSort}) sort2: MatSort;
  @ViewChild('table3', {read: MatSort}) sort3: MatSort;
  

  constructor(private _dagService: DagService) {
    this.filterDatum = new Date();
    this.filter$.pipe(
      distinctUntilChanged())
      .subscribe(
        val => {
          this.filterDatum = val;
          this.toonDag();
        }
      );
  }

  get datum() : Date{
    return this.filterDatum;
  }

  geefVorigeDatum() : void{
    this.filter$.next(new Date(new Date().setDate(this.filterDatum.getDate()-1)));
  }

  geefVolgendeDatum() : void{
    this.filter$.next(new Date(new Date().setDate(this.filterDatum.getDate()+1)));
  }

  toonDag() : void {
    this.subscription = this._dagService.getAanwezigheidslijst(this.filterDatum).subscribe(x => {
      var data = x.reduce((arr, dagatelier) => {
        return arr.concat(dagatelier.gebruikers.map(g =>
          ({ dagmoment: dagatelier.dagMoment, atelierType: dagatelier.atelier.atelierType, voornaam: g.voornaam, achternaam: g.achternaam })
        ))
      }, [])
      this.voormiddag.data = data;
      this.voormiddag.filterPredicate = (data, filter) => data.dagmoment == "Voormiddag";      
      this.namiddag.data = data;
      this.namiddag.filterPredicate = (data, filter) => data.dagmoment == "Namiddag";
      this.volledigeDag.data = data;
      this.volledigeDag.filterPredicate = (data, filter) => data.dagmoment == "VolledigeDag";
      this.voormiddag.filter = "a";
      this.namiddag.filter = "b";
      this.volledigeDag.filter = "c";
      this.voormiddag.sort = this.sort;
      this.namiddag.sort = this.sort2;
      this.volledigeDag.sort = this.sort3;
      
    });
  }

  ngOnInit() {
    this.toonDag();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
