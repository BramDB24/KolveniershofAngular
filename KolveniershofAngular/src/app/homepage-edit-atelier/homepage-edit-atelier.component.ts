import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Atelier } from '../models/atelier.model';
import { Gebruiker } from '../interfaces/gebruiker';
import { DagService } from '../services/dag.service';
import { GebruikerService } from '../services/gebruiker.service';
import { DagAtelier } from '../models/dag-atelier.model';
import { IDagAtelier } from '../interfaces/dag-atelier';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DagMoment } from '../enums/dag-moment.enum';

@Component({
  selector: 'app-homepage-edit-atelier',
  templateUrl: './homepage-edit-atelier.component.html',
  styleUrls: ['./homepage-edit-atelier.component.scss']
})
export class HomepageEditAtelierComponent implements OnInit, OnChanges {
  @Input() private dagAtelier: IDagAtelier;
  @Input() public isEdit: boolean;
  @Input() public dagplanningId: number;
  public loaded = false;
  public ateliers: Array<Atelier> = [];
  public alleGebruikers = new Array<Gebruiker>();
  public aanwezigen = new Array<Gebruiker>();
  public gebruikerToevoegenLijstError = '';
  public dagAtelierFormGroup: FormGroup;
  public dagMomenten = [
    { key: 'Voormiddag', value: DagMoment.Voormiddag },
    { key: 'Namiddag', value: DagMoment.Namiddag },
    { key: 'Volledige dag', value: DagMoment.VolledigeDag }
  ];

  /**
   * dagAtelierCopy wordt gebruikt als een mannier om data aan te passen in het dagAtelier
   * zonder het volledig op te slaan.
   * Gebruik dagAtelierCopy voor iedere situatie tenzij je effectief data wilt opslaan.
   */
  public dagAtelierCopy: IDagAtelier;

  constructor(
    private userService: GebruikerService,
    private dagService: DagService,
    private fb: FormBuilder
  ) { }

  ngOnChanges() {
    // initialiseer dagAtelierCopy
    this.dagAtelierCopy = new DagAtelier({ ...this.dagAtelier });

    // initialiseer form
    console.log('1: ' + this.ateliers);
    if (this.ateliers) {
      this.initialiseerFormGroup();
    }

    // reset css klassen
    this.aanwezigen.forEach(e =>
      document.getElementById(e.voornaam).classList.remove('style1')
    );
    this.aanwezigen = new Array<Gebruiker>();
    this.gebruikerToevoegenLijstError = '';
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
        this.alleGebruikers = entry;
      });
    this.dagService
      .getAteliers()
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe(entry => entry.forEach(e => this.ateliers.push(new Atelier(e))));
    this.initialiseerFormGroup();
  }

  private initialiseerFormGroup() {
    this.dagAtelierFormGroup = this.fb.group({
      // default value wordt niet toegevoegd
      atelierNaam: [this.dagAtelier ? this.dagAtelier.atelier.naam : '', this.valideerAtelierNaam.bind(this)],
      dagMoment: [this.dagAtelier ? this.dagAtelier.dagMoment : DagMoment.VolledigeDag]
    });
  }

  private valideerAtelierNaam(control: FormControl): { [key: string]: any } {
    const naam = control.value;

    if (!naam) {
      return { naamNietIngevuld: true };
    }
    console.log(this.ateliers);
    if (!this.ateliers.find(atelier => atelier.naam === naam)) {
      return { atelierBestaatNiet: true };
    }
    return null;
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
    // this.atelierNaam = atelierkeuze;
  }

  public getAanwezigen(user: Gebruiker) {
    if (this.dagAtelierCopy === null) {
      return false;
    }
    return this.dagAtelierCopy.gebruikers.some(
      client =>
        client.achternaam + client.voornaam === user.achternaam + user.voornaam
    );
  }

  public getNietAanwezigen(): Array<Gebruiker> {
    return this.alleGebruikers.filter(gebruiker =>
      this.dagAtelierCopy.gebruikers.filter(aanwezige =>
        aanwezige.voornaam === gebruiker.voornaam && aanwezige.achternaam === gebruiker.achternaam
      ).length <= 0
    );
  }

  public editAtelier(): void {
    this.aanwezigen.forEach(e => this.dagAtelierCopy.gebruikers.push(e));
  }

  public saveAtelier(): void {
    this.dagAtelier = new DagAtelier({
      atelier: {
        atelierType: 1,
        naam: "change me please"
      },
      dagMoment: 1,
      gebruikers: this.aanwezigen
    });

    // this.dagService.putDagAtelier(this.dagplanningId, this.dagAtelier).subscribe();
  }

  public voegGebruikerToeAanCopy(): void {
    // Zoek naar de juiste gebruiker
    const teZoekenGebruiker = (document.getElementById('gebruikerToevoegenLijst') as HTMLInputElement).value;
    const gevondenGebruiker = this.alleGebruikers.find(gebruiker =>
      (gebruiker.voornaam + ' ' + gebruiker.achternaam) === teZoekenGebruiker
    );

    // Als er geen gebruiker gevonden is, toon een foutmelding
    if (!gevondenGebruiker) {
      this.gebruikerToevoegenLijstError = 'Deze gebruiker bestaat niet.';
      return;
    }

    // Als de gebruiker al in de lijst is, toon een foutmelding
    if (this.dagAtelierCopy.gebruikers.find(aanwezige =>
      aanwezige.voornaam === gevondenGebruiker.voornaam && aanwezige.achternaam === gevondenGebruiker.achternaam
    )) {
      this.gebruikerToevoegenLijstError = 'Deze gebruiker is al toegevoegd.';
      return;
    }

    // Voeg gevondenGebruiker toe aan copy en clear het input element

    this.gebruikerToevoegenLijstError = '';
    (document.getElementById('gebruikerToevoegenLijst') as HTMLInputElement).value = '';
    this.dagAtelierCopy.gebruikers.push(gevondenGebruiker);




  }
}