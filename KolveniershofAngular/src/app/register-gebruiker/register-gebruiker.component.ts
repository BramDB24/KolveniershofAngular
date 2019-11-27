import { Component, OnInit } from '@angular/core';
import { GebruikerService } from '../services/gebruiker.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { BestandService } from '../services/bestand.service';
import { Gebruiker } from '../models/gebruiker.model';

function valideerBestandType(control: FormControl): { [key: string]: any } {
  const foto = control.value.name;
  if (!foto) {
    return { required: true };
  }
  if (foto.split('.').length !== 2) {
    return { wrongFileType: true };
  }
  const extentie = foto.split('.')[1];
  if (!['jpg', 'png'].includes(extentie.toLowerCase())) {
    return { wrongFileType: true };
  }
  return null;
}

@Component({
  selector: 'app-register-gebruiker',
  templateUrl: './register-gebruiker.component.html',
  styleUrls: ['./register-gebruiker.component.scss']
})
export class RegisterGebruikerComponent implements OnInit {
  public gebruikerFormGroup: FormGroup;
  public loader = false;
  public huidigeGebruiker: Gebruiker;
  public gebruikerTypes: string[];
  public submitButtonText: string;
  public readonly standaardTypeChecked = 2;
  public readonly typesMetOuderInfo = [2];
  public verbergOuderInfo = '';
  public submitted = false;
  public loaded = false;
  public bestaand: boolean;

  constructor(
    private gebruikerService: GebruikerService,
    private bestandService: BestandService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.gebruikerService
      .getGebruikerTypes()
      .pipe(
        finalize(() => {
          this.loaded = true;
          this.initialiseerFormGroup();
        })
      )
      .subscribe(entry => (this.gebruikerTypes = entry));
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.gebruikerService
            .getGebruikerViaId(params.id)
            .pipe(
              finalize(() => {
                this.loader = true;
              })
            )
            .subscribe(
              user => {
                console.log(user);
                this.huidigeGebruiker = user;
              },
              err => {
                alert('Er was een error bij het ophalen van de gebruiker.');
                console.log(err);
              },
              () => {
                this.initialiseerFormGroup();
              }
            );
        } else {
          this.huidigeGebruiker = null;
        }
      },
      err => {
        alert('Er was een error bij laden van de pagina.');
        console.log(err);
      }
    );
  }

  private initialiseerFormGroup() {
    this.gebruikerFormGroup = this.fb.group({
      achternaam: [
        this.huidigeGebruiker ? this.huidigeGebruiker.achternaam : '',
        Validators.required
      ],
      voornaam: [
        this.huidigeGebruiker ? this.huidigeGebruiker.voornaam : '',
        Validators.required
      ],
      gebruikerType: [
        this.huidigeGebruiker
          ? this.huidigeGebruiker.type
          : this.standaardTypeChecked,
        Validators.required
      ],
      email: [
        this.huidigeGebruiker ? this.huidigeGebruiker.email : '',
        [Validators.required, Validators.email]
      ],
      foto: [
        this.huidigeGebruiker ? this.huidigeGebruiker.foto : '',
        valideerBestandType
      ]
    });
    this.submitButtonText = this.huidigeGebruiker ? 'Aanpassen' : 'Creëren';
    this.bestaand = this.huidigeGebruiker ? true : false;
  }

  onSubmit() {
    this.submitted = true;
    // stop het process hier als de form invalid is
    if (this.gebruikerFormGroup.invalid) {
      return;
    }

    const nieuweGebruiker = {
      id: '',
      achternaam: this.gebruikerFormGroup.controls.achternaam.value,
      voornaam: this.gebruikerFormGroup.controls.voornaam.value,

      email: this.gebruikerFormGroup.controls.email.value,

      foto: this.gebruikerFormGroup.controls.foto.value.name,
      type: this.gebruikerFormGroup.controls.gebruikerType.value
    };
    if (this.huidigeGebruiker) {
      nieuweGebruiker.id = this.huidigeGebruiker.gebruikerId;
    }

    // Uploaden van de foto
    const fotoFormGroup = new FormGroup({
      foto: new FormControl(this.gebruikerFormGroup.controls.foto.value)
    });

    this.bestandService.postFile('gebruiker-foto', fotoFormGroup);

    // Stuur nieuweGebruiker naar de databank
    if (this.huidigeGebruiker) {
      this.gebruikerService
        .postUpdateGebruiker(nieuweGebruiker)
        .subscribe(response => {
          alert('Gebruiker geüpdate.');
        });
    } else {
      this.gebruikerService
        .postNieuweGebruiker(nieuweGebruiker)
        .subscribe(response => {
          alert('Gebruiker toegevoegd.');
        });
    }
  }

  hasRequiredField(abstractControl: AbstractControl): boolean {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    if (abstractControl['controls']) {
      for (const controlName in abstractControl['controls']) {
        if (abstractControl['controls'][controlName]) {
          if (this.hasRequiredField(abstractControl['controls'][controlName])) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
