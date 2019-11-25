import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker.model';
import { GebruikerService } from '../services/gebruiker.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beheer-personen',
  templateUrl: './beheer-personen.component.html',
  styleUrls: ['./beheer-personen.component.scss']
})
export class BeheerPersonenComponent implements OnInit {
  public gebruikers = new Array<Gebruiker>();
  public gebruikersLoaded = false;

  constructor(private router: Router, private gebruikerService: GebruikerService) { }

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
      });
  }

  public redirect(gebruiker: Gebruiker): void {
    this.router.navigate([`/register-gebruiker/${gebruiker.gebruikerId}`]);
  }

}
