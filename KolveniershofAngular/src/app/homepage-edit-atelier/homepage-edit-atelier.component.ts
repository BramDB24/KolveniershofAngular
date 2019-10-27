import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Atelier } from '../models/atelier.model';
import { Gebruiker } from '../interfaces/gebruiker';
import { DagService } from '../services/dag.service';
import { GebruikerService } from '../services/gebruiker.service';
import { DagAtelier } from '../models/dag-atelier.model';
import { IDagAtelier } from '../interfaces/dag-atelier';
import { FormGroup, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
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
  @Output() public newDagAtelierAddedEvent = new EventEmitter();
  public gebruikersLoaded = false;
  public ateliersLoaded = false;
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
  public submitted = false;

  /**
   * dagAtelierCopy wordt gebruikt als een mannier om data aan te passen in het dagAtelier
   * zonder het volledig op te slaan.
   * Gebruik dagAtelierCopy voor iedere situatie tenzij je data effectief wilt opslaan.
   */
  public dagAtelierCopy: IDagAtelier;

  constructor(
    private gebruikerService: GebruikerService,
    private dagService: DagService,
    private fb: FormBuilder
  ) { }

  ngOnChanges() {
    // initialiseer dagAtelierCopy
    if (this.dagAtelier) {
      this.dagAtelierCopy = new DagAtelier({ ...this.dagAtelier });
    } else {
      this.dagAtelierCopy = new DagAtelier({});
    }
    // initialiseer form
    if (this.loaded()) {
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
    this.gebruikerService
      .getUsers()
      .pipe(finalize(() => {
        this.gebruikersLoaded = true;
        if (this.loaded()) {
          this.initialiseerFormGroup();
        }
      }))
      .subscribe(entry => {
        this.alleGebruikers = entry;
      });
    this.dagService
      .getAteliers()
      .pipe(finalize(() => {
        this.ateliersLoaded = true;
        if (this.loaded()) {
          this.initialiseerFormGroup();
        }
      }))
      .subscribe(entry => {
        entry.forEach(e => this.ateliers.push(new Atelier(e)));
        this.ateliers.sort((a1, a2) => {
          if (a1.naam > a2.naam) {
            return 1;
          }
          if (a1.naam < a2.naam) {
            return -1;
          }
          return 0;
        });
      });
    this.initialiseerFormGroup();
  }

  public loaded() {
    return this.gebruikersLoaded && this.ateliersLoaded;
  }

  private initialiseerFormGroup() {
    this.dagAtelierFormGroup = this.fb.group({
      atelierNaam: [this.dagAtelier ? this.dagAtelier.atelier.naam : '', this.valideerAtelierNaam.bind(this)],
      dagMoment: [this.dagAtelier ? this.dagAtelier.dagMoment :
        (this.dagAtelierCopy ? this.dagAtelierCopy.dagMoment : DagMoment.VolledigeDag)]
    });
  }

  private valideerAtelierNaam(control: FormControl): { [key: string]: any } {
    const naam = control.value;

    if (!naam) {
      return { naamNietIngevuld: 'Voeg een atelier naam toe' };
    }
    if (!this.ateliers.find(atelier => atelier.naam === naam)) {
      return { atelierBestaatNiet: 'Het opgegeven atelier bestaat niet' };
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

  public verwijderGebruiker(gebruiker: Gebruiker): void {
    if (!confirm(`Weet je zeker dat je ${gebruiker.voornaam} ${gebruiker.achternaam} niet meer in het atelier mag zijn?`)) {
      return;
    }
    const index = this.dagAtelierCopy.gebruikers.findIndex(entry =>
      entry.voornaam === gebruiker.voornaam &&
      entry.achternaam === entry.achternaam);
    this.dagAtelierCopy.gebruikers.splice(index, 1);
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
    ).sort((g1, g2) => {
      const g1Naam = g1.voornaam + ' ' + g1.achternaam;
      const g2Naam = g2.voornaam + ' ' + g2.achternaam;
      if (g1Naam > g2Naam) {
        return 1;
      }

      if (g1Naam < g2Naam) {
        return -1;
      }

      return 0;
    });
  }

  // public editAtelier(): void {
  //   this.aanwezigen.forEach(e => this.dagAtelierCopy.gebruikers.push(e));
  // }

  // public saveAtelier(): void {
  //   this.dagAtelier = new DagAtelier({
  //     atelier: {
  //       atelierType: 1,
  //       naam: "change me please"
  //     },
  //     dagMoment: 1,
  //     gebruikers: this.aanwezigen
  //   });

  //   // this.dagService.putDagAtelier(this.dagplanningId, this.dagAtelier).subscribe();
  // }

  public onSubmit(): void {
    this.submitted = true;

    // stop het process hier als de form invalid is
    if (this.dagAtelierFormGroup.invalid) {
      console.log('submit error');
      console.log(this.dagAtelierFormGroup);
      return;
    }

    this.dagAtelierCopy.dagMoment = this.dagAtelierFormGroup.controls.dagMoment.value;
    const formAtelierNaam = this.dagAtelierFormGroup.controls.atelierNaam.value;
    if (!this.dagAtelier || (this.dagAtelier.atelier.naam !== formAtelierNaam)) {
      this.dagAtelierCopy.atelier = this.ateliers.find(atelier => atelier.naam === formAtelierNaam);
    }

    this.dagAtelier = this.dagAtelierCopy;

    this.dagService.putDagAtelier(this.dagplanningId, this.dagAtelier).subscribe(entry => { },
      err => {
        console.log(err);
        alert('Er was een probleem bij het opslaan van de aanpassing.\n'
          + 'Een techische beschrijving over te fout werd in de console geschreven.');
      },
      () => {
        this.newDagAtelierAddedEvent.emit();
        alert('De aanpassingen zijn opgeslagen');
      }
    );
  }

  public atelierNaamFormErrors(): string[] {
    const errors = this.dagAtelierFormGroup.controls.atelierNaam.errors;
    const errorBerichten: string[] = [];
    Object.keys(errors).forEach(key => {
      errorBerichten.push(errors[key]);
    });
    return errorBerichten;
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