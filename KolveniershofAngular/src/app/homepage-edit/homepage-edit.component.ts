import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DagAtelier } from '../models/dag-atelier.model';
import { DagPlanning } from '../models/dag-planning.model';
import { DagService } from '../services/dag.service';

// States worden gebruikt om te bepalen of een subcomponent getoond moet worden of niet
export enum State {
    Standard = 'standard',
    Edit = 'edit',
    Dag = 'Dag',
    DagEdit = 'DagEdit',
}

@Component({
    selector: 'app-homepage-edit',
    templateUrl: './homepage-edit.component.html',
    styleUrls: ['./homepage-edit.component.scss'],
})
export class HomepageEditComponent implements OnInit, OnChanges {
    @Input() public geselecteerdeWeekdag: number;
    @Input() public geselecteerdeWeek: number;
    @Input() public datum: Date;
    public atelier: DagAtelier;
    public dagPlanning: DagPlanning;
    public isEdit = false;
    public state = State.Standard;
    StateType = State;
    loaded = false;
    constructor(private dagService: DagService) {}

    ngOnInit() {
        this.state = State.Standard;
        // in een vorig component hebben we api call gedaan naar een bepaalde datum
        // als we in dit component terecht komen weten we dat we de reeds opgehaalde dag willen aanpassen
        // ipv een nieuwe call te doen kunnen we dus hetzelfde object gebruiken
        if (this.datum == null) {
            this.haalDagplanningTemplateOpMetWeekdagEnWeek(
                this.geselecteerdeWeek,
                this.geselecteerdeWeekdag
            );
        } else {
            this.haalDagplanningOpMetDatum(this.datum);
        }
    }

    ngOnChanges() {
        if (this.datum == null) {
            this.haalDagplanningTemplateOpMetWeekdagEnWeek(
                this.geselecteerdeWeek,
                this.geselecteerdeWeekdag
            );
        } else {
            this.haalDagplanningOpMetDatum(this.datum);
        }
    }

    public haalDagplanningOpMetDatum(date: Date): void {
        this.dagService
            .getDag(date)
            .pipe(
                finalize(() => {
                    this.loaded = true;
                })
            )
            .subscribe(dag => {
                this.dagPlanning = this.dagService.huidigeGeselecteerdeDag;
            });
    }

    public haalDagplanningTemplateOpMetWeekdagEnWeek(
        week: number,
        weekdag: number
    ) {
        this.dagService
            .getDagTemplate(week, weekdag)
            .pipe(
                finalize(() => {
                    this.loaded = true;
                })
            )
            .subscribe(dag => {
                this.dagPlanning = this.dagService.huidigeGeselecteerdeDag;
            });
    }

    public updateAtelierLijst(): void {
        this.ngOnChanges();
    }

    public setAtelier(atelier: DagAtelier) {
        this.atelier = atelier;
        this.isEdit = true;
        this.state = State.Edit;
    }

    public nieuwAtelier() {
        this.atelier = Object.assign(new DagAtelier());
        this.isEdit = false;
        this.state = State.Edit;
    }

    public deleteAtelierUitDagplanning(atelier) {
        console.log(this.dagPlanning.weekdag);
        console.log(this.dagPlanning.weeknummer);
        console.log(atelier);
        if (
            confirm(
                'Bent u zeker dat u dit atelier wilt verwijderen van de dagplanning?'
            )
        ) {
            if (this.datum == null) {
                this.dagService
                    .deleteAterlierUitDagplanningTemplate(
                        this.dagPlanning.weeknummer,
                        this.dagPlanning.weekdag,
                        atelier
                    )

                    .subscribe();
            } else {
                this.dagService
                    .deleteAterlierUitDagplanning(
                        this.dagPlanning.datum,
                        atelier
                    )
                    .subscribe();
            }
            var indexAteliers = this.dagPlanning.dagAteliers.indexOf(atelier);
            if (indexAteliers > -1) {
                this.dagPlanning.dagAteliers.splice(indexAteliers, 1);
            }
        }
    }
}
