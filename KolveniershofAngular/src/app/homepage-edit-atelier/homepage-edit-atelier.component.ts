import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Atelier } from '../interfaces/atelier';
import { DagAtelier } from '../interfaces/dag-atelier';
import { Gebruiker } from '../interfaces/gebruiker';
import { DagService } from '../services/dag.service';
import { GebruikerService } from '../services/gebruiker.service';

@Component({
  selector: 'app-homepage-edit-atelier',
  templateUrl: './homepage-edit-atelier.component.html',
  styleUrls: ['./homepage-edit-atelier.component.scss']
})
export class HomepageEditAtelierComponent implements OnInit, OnChanges {
  @Input() public dagAtelier: DagAtelier;
  @Input() public isEdit: boolean;
  @Input() public dagplanningId: number;
  public loaded = false;
  public ateliers = Array<Atelier>();
  public gebruikers = Array<Gebruiker>();
  public begeleiders = Array<Gebruiker>();
  public aanwezigen = new Array<Gebruiker>();
  public atelierNaam: string;

  constructor(
    private userService: GebruikerService,
    private dagService: DagService
  ) {}

  ngOnChanges() {
    this.aanwezigen.forEach(e =>
      document.getElementById(e.voornaam).classList.remove('style1')
    );
    this.aanwezigen = new Array<Gebruiker>();
  }

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(entry => {
        entry.forEach(element => {
          element.type === 1
            ? this.gebruikers.push(element)
            : element.type === 3
            ? this.begeleiders.push(element)
            : null;
        });
      });
    this.dagService
      .getAteliers()
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe(entry => entry.forEach(e => this.ateliers.push(e)));
  }

  public select(user: Gebruiker): void {
    if (this.aanwezigen.includes(user)) {
      const index = this.aanwezigen.indexOf(user);
      this.aanwezigen.splice(index, 1);
      document.getElementById(user.voornaam).classList.remove('style1');
    } else {
      this.aanwezigen.push(user);
      document.getElementById(user.voornaam).classList.add('style1');
    }
  }

  public onChange(atelierkeuze: string) {
    this.atelierNaam = atelierkeuze;
  }

  public getAanwezigen(user: Gebruiker) {
    if (this.dagAtelier === null) {
      return false;
    }
    return this.dagAtelier.gebruikers.some(
      client =>
        client.achternaam + client.voornaam === user.achternaam + user.voornaam
    );
  }

  public editAtelier(): void {
    this.aanwezigen.forEach(e => this.dagAtelier.gebruikers.push(e));
  }

  public saveAtelier(): void {
    this.dagAtelier = {
      atelier: {
        aterlierType: 1,
        naam: this.atelierNaam
      },
      dagMoment: 1,
      gebruikers: this.aanwezigen
    };

    //this.dagService.putDagAtelier(this.dagplanningId, this.dagAtelier).subscribe(); 
  }
}


