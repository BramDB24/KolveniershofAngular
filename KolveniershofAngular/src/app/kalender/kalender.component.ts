import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Gebruiker } from '../models/gebruiker.model';

export enum State {
    Dag = 'dag',
    DagEdit = 'dagEdit',
    Opmerkingen = 'opmerkingen',
}

@Component({
    selector: 'app-kalender',
    templateUrl: './kalender.component.html',
    styleUrls: ['./kalender.component.scss'],
})
export class KalenderComponent implements OnInit {
    public datum: Date = new Date();
    public state = State.Dag;
    // StateType gelijk stellen aan enum State, anders kan html hier niet aan
    StateType = State;

    constructor(private router: Router, private auth: AccountService) {
        this.state = State.Dag;
    }

    public veranderState(type: State) {
        this.state = type;
    }

    public veranderDatum(nr: number): void {
        if (this.state === State.DagEdit) {
            this.veranderState(State.Dag);
        }

        this.datum = new Date(
            this.datum.getFullYear(),
            this.datum.getMonth(),
            this.datum.getDate() + nr
        );
    }

    public vorigeDatum(): void {
        this.veranderDatum(-1);
    }

    public volgendeDatum(): void {
        this.veranderDatum(+1);
    }

    public redirect(route: string) {
        this.router.navigate([`${route}`]);
    }

    ngOnInit() {}
}
