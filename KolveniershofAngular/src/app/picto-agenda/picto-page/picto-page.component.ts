import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { DagPlanning } from 'src/app/models/dag-planning.model';
import { DagService } from 'src/app/services/dag.service';
import { PictoDag } from 'src/app/models/pictodag.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { Gebruiker } from 'src/app/models/gebruiker.model';

@Component({
    selector: 'app-picto-page',
    templateUrl: './picto-page.component.html',
    styleUrls: ['./picto-page.component.scss'],
})
export class PictoPageComponent implements OnInit {
    private _gebruiker: Gebruiker;
    public weekdagen = new Array<string>('Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag');
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

    @Input() set gebruiker(gebruiker: Gebruiker) {
        this._gebruiker = gebruiker;
        this.toonWeek();
    }

    get titel(): string {
        if (this._gebruiker)
            return `Pictoagenda van ${this._gebruiker.voornaam} ${this._gebruiker.achternaam}`;
        return "MIJN PICTOAGENDA";
    }

    get datum(): Date {
        return this.filterDatum;
    }

    ngOnInit() {
        this.toonWeek();
    }

    geefVorigeDatum(): void {
        this.filter$.next(new Date(this.filterDatum.getTime() - 1000 * 60 * 60 * 24));
    }

    geefVolgendeDatum(): void {
        this.filter$.next(new Date(this.filterDatum.getTime() + 1000 * 60 * 60 * 24));
    }

    toonWeek() {
        this.$pictodagen = this._dagService.getPictoAgendas(this.filterDatum);
    }


}
