import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { DagMoment } from '../enums/dag-moment.enum';
import { Atelier } from '../models/atelier.model';
import { DagAtelier } from '../models/dag-atelier.model';
import { Gebruiker } from '../models/gebruiker.model';
import { DagService } from '../services/dag.service';
import { GebruikerService } from '../services/gebruiker.service';


@Component({
  selector: 'app-homepage-edit-atelier',
  templateUrl: './homepage-edit-atelier.component.html',
  styleUrls: ['./homepage-edit-atelier.component.scss']
})
export class HomepageEditAtelierComponent implements OnInit, OnChanges {
  @Input() private dagAtelier: DagAtelier;
  @Input() public isEdit: boolean;
  @Input() public dagplanningId: number;
  @Output() public newDagAtelierAddedEvent = new EventEmitter();
  public gebruikersLoaded = false;
  public ateliersLoaded = false;
  public ateliers: Array<Atelier> = [];
  public alleGebruikers = new Array<Gebruiker>();
  public gebruikerToevoegenLijstError = '';
  public dagAtelierFormGroup: FormGroup;
  public dagMomenten = [
    { key: 'Voormiddag', value: DagMoment.Voormiddag },
    { key: 'Namiddag', value: DagMoment.Namiddag },
    { key: 'Volledige dag', value: DagMoment.VolledigeDag }
  ];
  public submitted = false;
  public initform = false;
  public geselecteerdeGebruiker: Gebruiker;

  constructor(
    private gebruikerService: GebruikerService,
    private dagService: DagService,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
    if (this.loaded()) {
      this.initialiseerFormGroup();
    }
  }

  ngOnInit() {
    this.gebruikerService
      .getUsers()
      .pipe(
        finalize(() => {
          this.gebruikersLoaded = true;
          if (this.loaded()) {
            this.initialiseerFormGroup();
          }
        })
      )
      .subscribe(entry => {
        this.alleGebruikers = entry;
      });

    this.dagService
      .getAteliers()
      .pipe(
        finalize(() => {
          this.ateliersLoaded = true;
          if (this.loaded()) {
            this.initialiseerFormGroup();
          }
        })
      )
      .subscribe(entry => {
        this.ateliers = entry;
      });
    this.initialiseerFormGroup();
  }

  public loaded() {
    return this.gebruikersLoaded && this.ateliersLoaded;
  }

  private initialiseerFormGroup() {
    this.dagAtelierFormGroup = this.fb.group({
      atelierNaam: [
        !this.dagAtelier.atelier ? '' : this.dagAtelier.atelier.naam,
        this.valideerAtelierNaam.bind(this)
      ],
      dagMoment: [
        this.dagAtelier
          ? this.dagAtelier.dagMoment
          : this.dagAtelier
          ? this.dagAtelier.dagMoment
          : DagMoment.VolledigeDag
      ]
    });
    this.initform = true;
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

  public verwijderGebruiker(gebruiker: Gebruiker): void {
    if (
      !confirm(
        `Weet je zeker dat je ${gebruiker.voornaam} ${gebruiker.achternaam} niet meer in het atelier mag zijn?`
      )
    ) {
      return;
    }
    this.dagAtelier.verwijderGebruikerVanDagatelier(gebruiker);
  }

  public getAanwezigen(gebruiker: Gebruiker) {
    this.dagAtelier.getAanwezigenVanDagatelier(gebruiker);
  }

  public getNietAanwezigen(): Array<Gebruiker> {
    return this.dagAtelier.getNiewAanwezigen(this.alleGebruikers);
  }

  public onSubmit(): void {
    this.submitted = true;

    // stop het process hier als de form invalid is
    if (this.dagAtelierFormGroup.invalid) {
      return;
    }

    this.dagAtelier.dagMoment = this.dagAtelierFormGroup.controls.dagMoment.value;
    const formAtelierNaam = this.dagAtelierFormGroup.controls.atelierNaam.value;
    if (!this.dagAtelier || this.dagAtelier.atelier.naam !== formAtelierNaam) {
      this.dagAtelier.atelier = this.ateliers.find(
        atelier => atelier.naam === formAtelierNaam
      );
    }

    this.dagService
      .putDagAtelier(this.dagplanningId, this.dagAtelier)
      .subscribe(
        entry => {},
        err => {
          alert(
            'Er was een probleem bij het opslaan van de aanpassing.\n' +
              'Een techische beschrijving over te fout werd in de console geschreven.'
          );
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

  public gekozenGebruiker(e: string): void {
    if (e) {
      const id = document
        .getElementById(e.replace(/\s/g, ''))
        .getAttribute('data-index');
      this.geselecteerdeGebruiker = this.alleGebruikers.find(
        g => g.gebruikerId === id
      );
    }
  }

  public voegGebruikerToe(): void {
    if (!this.geselecteerdeGebruiker) {
      this.gebruikerToevoegenLijstError = 'Gelieve een gebruiker te selecter';
      return;
    }
    if (this.dagAtelier.gebruikers.includes(this.geselecteerdeGebruiker)) {
      this.gebruikerToevoegenLijstError =
        'Deze gebruiker is al aanwezig vandaag';
      return;
    }
    this.dagAtelier.voegGebruikerToeAanDagplanning(this.geselecteerdeGebruiker);
    (document.getElementById(
      'gebruikerToevoegenLijst'
    ) as HTMLInputElement).value = '';
  }
}