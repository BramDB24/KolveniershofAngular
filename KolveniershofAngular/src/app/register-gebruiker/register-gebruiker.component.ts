import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Gebruiker } from '../interfaces/gebruiker';
import { GebruikerService } from '../services/gebruiker.service';

@Component({
  selector: 'app-register-gebruiker',
  templateUrl: './register-gebruiker.component.html',
  styleUrls: ['./register-gebruiker.component.scss']
})
export class RegisterGebruikerComponent implements OnInit {
  public gebruikerFormGroup: FormGroup;
  public loader = false;
  public huidigeGebruiker: Gebruiker;
  public _gebruikerTypes: string[];
  public submitButtonText: string;
  public readonly standaardTypeChecked = 2;
  public readonly typesMetOuderInfo = [2];
  public verbergOuderInfo = '';
  public submitted = false;

  constructor(
    private gebruikerService: GebruikerService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // this.gebruikerService.getUserTypes().subscribe(
    //   types => this._gebruikerTypes = types,
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
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.gebruikerFormGroup = this.fb.group({
      naam: [
        this.huidigeGebruiker ? this.huidigeGebruiker.achternaam : '',
        Validators.required
      ],
      voornaam: [
        this.huidigeGebruiker ? this.huidigeGebruiker.voornaam : '',
        Validators.required
      ],
      naamOuder: [this.huidigeGebruiker ? this.huidigeGebruiker.naamOuder : ''],
      voornaamOuder: [
        this.huidigeGebruiker ? this.huidigeGebruiker.voornaamOuder : ''
      ],
      email: [
        this.huidigeGebruiker ? this.huidigeGebruiker.email : '',
        [Validators.required, Validators.email]
      ],
      wachtwoord: [
        this.huidigeGebruiker ? this.huidigeGebruiker.wachtwoord : '',
        Validators.required
      ],
      straat: [
        this.huidigeGebruiker ? this.huidigeGebruiker.straatnaam : '',
        Validators.required
      ],
      huisnummer: [
        this.huidigeGebruiker ? this.huidigeGebruiker.huisnummer : '',
        Validators.required
      ],
      busnummer: [this.huidigeGebruiker ? this.huidigeGebruiker.busnummer : ''],
      gemeente: [
        this.huidigeGebruiker ? this.huidigeGebruiker.gemeente : '',
        Validators.required
      ],
      postcode: [
        this.huidigeGebruiker ? this.huidigeGebruiker.postcode : '',
        Validators.required
      ],
      gebruikerType: [
        this.huidigeGebruiker
          ? this.huidigeGebruiker.type
          : this.standaardTypeChecked,
        Validators.required
      ],
      foto: [
        this.huidigeGebruiker ? this.huidigeGebruiker.type : '',
        Validators.required
      ]
    });
    this.typeVeranderd(
      this.huidigeGebruiker
        ? this.huidigeGebruiker.type
        : this.standaardTypeChecked
    );

    this.submitButtonText = this.huidigeGebruiker ? 'Aanpassen' : 'Creëren';
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

    console.log('submitted');
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
