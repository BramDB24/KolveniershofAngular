import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { Observable, Subject, Subscription } from 'rxjs';
import { DagPlanning } from 'src/app/models/dag-planning.model';
import { DagService } from 'src/app/services/dag.service';
import { PictoDag } from 'src/app/models/pictodag.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-picto-page',
    templateUrl: './picto-page.component.html',
    styleUrls: ['./picto-page.component.scss'],
})
export class PictoPageComponent implements OnInit {
    private _gebruiker: Gebruiker;
    private _subscription: Subscription;
    public dagpictos = new Array<string>('maandag.jpg', 'dinsdag.png', 'woensdag.png', 'donderdag.png', 'vrijdag.png', 'zaterdag.png', 'zondag.png');
    public filterDatum: Date = new Date();
    public filter$ = new Subject<Date>();
    public weekdagen: PictoDag[];
    public weekenddagen: PictoDag[];
    public loadingError: HttpErrorResponse;
    public loading: boolean;

    constructor(private _dagService: DagService) {
        this.filter$.pipe(
            distinctUntilChanged())
            .subscribe(
                val => {
                    this.filterDatum = val;
                    if (!this.isZelfdeWeek(val)) {
                        this.toonWeek();
                    }
                }
            );
    }

    /**
     * (Methode wordt geactiveerd wanneer de admin/begeleider een client kiest om 
     * zijn pictoagenda raad te plegen.
     * De gebruiker wordt aangepast en zijn pictoagenda wordt getoond.
     */
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

    geefVorigeDatum(): void {
        this.filter$.next(new Date(this.filterDatum.getTime() - 1000 * 60 * 60 * 24));
    }

    geefVolgendeDatum(): void {
        this.filter$.next(new Date(this.filterDatum.getTime() + 1000 * 60 * 60 * 24));
    }

    toonWeek() {
        let id = null;
        if (this._gebruiker){
            id = this._gebruiker.gebruikerId;
        }
        this._subscription = this._dagService.getPictoAgendas(this.filterDatum, id).subscribe(
            val => {
                this.loading = true;
                if (val && val.length == 7) {
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
        let weekdaynr = datum.getDay();
        switch (weekdaynr) {
            case 0: return this.weekenddagen[0].datum == datum;
            case 6: return this.weekenddagen[1].datum == datum;
            default: return this.weekdagen[weekdaynr - 1].datum == datum;
        }
    }

    ngOnInit() {
        this.toonWeek();
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    isSelected(dag: PictoDag) {
        return new Date(dag.datum).toDateString() == this.filterDatum.toDateString();
    }
}
