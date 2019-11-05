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
  const foto = control.value;
  if (!foto) {
    return { required: true };
  }
  if (foto.name.split('.').length !== 2) {
    return { wrongFileType: true };
  }
  const extentie = foto.name.split('.')[1];
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

  constructor(
    private gebruikerService: GebruikerService,
    private bestandService: BestandService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // this.gebruikerService.getUserTypes().subscribe(
    //   types => this.gebruikerTypes = types,
    //   err => {
    //     alert('Er was een error bij het ophalen van de gebruiker soorten.');
    //     console.log(err);
    //   },
    //   () => {
    //     this.initializeFormGroup();
    //   });
    // this.route.params.subscribe(params => {
    //   if (params.id) {
    //     this.gebruikerService.getUser(+params.id)
    //       .pipe(
    //         finalize(() => {
    //           this.loader = true;
    //         })
    //       )
    //       .subscribe(user => {
    //         this.huidigeGebruiker = user;
    //       },
    //         err => {
    //           alert('Er was een error bij het ophalen van de gebruiker.');
    //           console.log(err);
    //         },
    //         () => {
    //           this.initializeFormGroup();
    //         });
    //   } else {
    //     this.huidigeGebruiker = null;
    //   }
    // },
    //   err => {
    //     alert('Er was een error bij laden van de pagina.');
    //     console.log(err);
    //   });
    this.initialiseerFormGroup();
  }

  private initialiseerFormGroup() {
    // this.gebruikerFormGroup = this.fb.group({
    //   achternaam: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.achternaam : '',
    //     Validators.required
    //   ],
    //   voornaam: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.voornaam : '',
    //     Validators.required
    //   ],
    //   achternaamOuder: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.achternaamOuder : ''
    //   ],
    //   voornaamOuder: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.voornaamOuder : ''
    //   ],
    //   email: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.email : '',
    //     [Validators.required, Validators.email]
    //   ],
    //   wachtwoord: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.wachtwoord : '',
    //     Validators.required
    //   ],
    //   straat: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.straatnaam : '',
    //     Validators.required
    //   ],
    //   huisnummer: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.huisnummer : '',
    //     Validators.required
    //   ],
    //   busnummer: [this.huidigeGebruiker ? this.huidigeGebruiker.busnummer : ''],
    //   gemeente: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.gemeente : '',
    //     Validators.required
    //   ],
    //   postcode: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.postcode : '',
    //     Validators.required
    //   ],
    //   gebruikerType: [
    //     this.huidigeGebruiker
    //       ? this.huidigeGebruiker.type
    //       : this.standaardTypeChecked,
    //     Validators.required
    //   ],
    //   foto: [
    //     this.huidigeGebruiker ? this.huidigeGebruiker.type : '',
    //     valideerBestandType
    //   ]
    // });
    // this.typeVeranderd(
    //   this.huidigeGebruiker
    //     ? this.huidigeGebruiker.type
    //     : this.standaardTypeChecked
    // );

    // this.submitButtonText = this.huidigeGebruiker ? 'Aanpassen' : 'Creëren';
  }

  typeVeranderd(type: number) {
    if (this.typesMetOuderInfo.includes(type)) {
      this.verbergOuderInfo = '';
    } else {
      this.verbergOuderInfo = 'd-none';
    }
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
      achternaamOuder: this.gebruikerFormGroup.controls.achternaamOuder.value,
      voornaamOuder: this.gebruikerFormGroup.controls.voornaamOuder.value,
      email: this.gebruikerFormGroup.controls.email.value,
      wachtwoord: this.gebruikerFormGroup.controls.wachtwoord.value,
      straat: this.gebruikerFormGroup.controls.straat.value,
      huisnummer: this.gebruikerFormGroup.controls.huisnummer.value,
      busnummer: this.gebruikerFormGroup.controls.busnummer.value,
      gemeente: this.gebruikerFormGroup.controls.gemeente.value,
      postcode: this.gebruikerFormGroup.controls.postcode.value,
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
