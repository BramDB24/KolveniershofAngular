import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { DagPlanning } from 'src/app/models/dag-planning.model';
import { DagService } from 'src/app/services/dag.service';
import { PictoDag } from 'src/app/models/pictodag.model';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-picto-page',
    templateUrl: './picto-page.component.html',
    styleUrls: ['./picto-page.component.scss'],
})
export class PictoPageComponent implements OnInit {
    public weekdagen = new Array<string>('Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag');
    public weekendDagen = new Array<string>('Zat', 'Zon');
    public isWeekend = false;
    public filterDatum: Date = new Date();
    public filter$ = new Subject<Date>();
    public $pictodagen: Observable<PictoDag[]>;

    constructor(private _dagService: DagService) {
        this.filter$.pipe(
            distinctUntilChanged())
            .subscribe(
                val => {
                    this.filterDatum = val;
                    this.toonWeek();
                }
            );
    }

    get datum(): Date {
        return this.filterDatum;
    }

    ngOnInit() {
        this.toonWeek();
    }

    public switchWeekendState(): void {
        this.isWeekend = !this.isWeekend;
    }

    public displayDagen(): Array<string> {
        return this.isWeekend ? this.weekendDagen : this.weekdagen;
    }

    geefVorigeDatum(): void {
        console.log('start');
        console.log(this.filterDatum);
        this.filter$.next(new Date(this.filterDatum.getTime()-1000*60*60*24));
        console.log(this.filterDatum);
        console.log('eind')
    }

    geefVolgendeDatum(): void {
        this.filter$.next(new Date(this.filterDatum.getTime()+1000*60*60*24));
    }

    toonWeek(){
        this.$pictodagen = this._dagService.getPictoAgendas(this.filterDatum);
    }


}
