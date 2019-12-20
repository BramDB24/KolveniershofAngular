import { Component, OnInit, ViewChild } from '@angular/core';
import { Gebruiker } from '../models/gebruiker.model';
import { GebruikerService } from '../services/gebruiker.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'app-beheer-personen',
    templateUrl: './beheer-personen.component.html',
    styleUrls: ['./beheer-personen.component.scss'],
})
export class BeheerPersonenComponent implements OnInit {
    public gebruikers = new Array<Gebruiker>();
    public gebruikersLoaded = false;
    public gebruikerLijst = new MatTableDataSource<Gebruiker>();
    public kolommen: string[] = [
        'nummer',
        'voornaam',
        'achternaam',
        'type',
        'bewerken',
    ];

    @ViewChild('gebruikertabel', { read: MatSort }) sort: MatSort;

    constructor(
        private router: Router,
        private gebruikerService: GebruikerService
    ) {}

    ngOnInit() {
        this.gebruikerService
            .getUsers()
            .pipe(
                finalize(() => {
                    this.gebruikersLoaded = true;
                })
            )
            .subscribe(entry => {
                this.gebruikers = entry;
                this.gebruikerLijst.data = this.gebruikers;
                setTimeout(() => {
                    this.gebruikerLijst.sort = this.sort;
                });
            });
    }

    public redirect(gebruiker: Gebruiker): void {
        this.router.navigate([`/register-gebruiker/${gebruiker.id}`]);
    }

    public nieuweGebruiker(): void {
        this.router.navigate([`/register-gebruiker/`]);
    }

    public verwijderGebruiker(gebruiker: Gebruiker) {
        if (
            confirm(
                'Bent u zeker dat u ' +
                    gebruiker.voornaam +
                    ' ' +
                    gebruiker.achternaam +
                    ' wilt verwijderen?'
            )
        ) {
            this.gebruikerService.verwijderGebruiker(gebruiker).subscribe(
                response => {
                    alert(
                        'Gebruiker ' +
                            gebruiker.voornaam +
                            ' ' +
                            gebruiker.achternaam +
                            ' werd verwijderd.'
                    );
                },
                error => {},
                () => {
                    window.location.reload();
                }
            );
        }
    }
}
