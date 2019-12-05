import { Component, OnInit, ViewChild } from '@angular/core';
import { GebruikerService } from '../services/gebruiker.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BestandService } from '../services/bestand.service';
import { Gebruiker } from '../models/gebruiker.model';
import { FileUploadComponent } from '../file-upload/file-upload.component';

function valideerBestandType(control: FormControl): { [key: string]: any } {
  const foto = control.value.name;
  if (!foto) {
    return { required: true };
  }
  if (foto.split('.').length !== 2) {
    return { wrongFileType: true };
  }
  const extentie = foto.split('.')[1];
  if (!['jpg', 'png', 'jpeg'].includes(extentie.toLowerCase())) {
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
  public readonly standaardTypeChecked = 'cliënt';
  public verbergOuderInfo = '';
  public submitted = false;
  public loaded = false;
  public fototijdelijk: string;

  constructor(
    private gebruikerService: GebruikerService,
    private bestandService: BestandService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

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
    this.route.params.subscribe(params => {
      if (params.id) {
        this.gebruikerService.getGebruikerViaId(params.id)
          .pipe(
            finalize(() => {
              this.loader = true;
            })
          )
          .subscribe(user => {
            this.huidigeGebruiker = user;
          },
            err => {
              alert('Er was een error bij het ophalen van de gebruiker.');
              console.log(err);
            },
            () => {
              this.initialiseerFormGroup();
            });
      } else {
        this.huidigeGebruiker = null;
      }
    },
      err => {
        alert('Er was een error bij laden van de pagina.');
         console.log(err);
       });
    this.initialiseerFormGroup();
  }


  private initialiseerFormGroup() {
    this.gebruikerFormGroup = this.fb.group({
      achternaam: [this.huidigeGebruiker ? this.huidigeGebruiker.achternaam : '', Validators.required],
      voornaam: [this.huidigeGebruiker ? this.huidigeGebruiker.voornaam : '', Validators.required],
      email: [this.huidigeGebruiker ? this.huidigeGebruiker.email : '', [Validators.required, Validators.email]],
      wachtwoord: ['', [Validators.required]],
      bevestigWachtwoord: ['', [Validators.required]],
      gebruikerType: [this.huidigeGebruiker ? this.huidigeGebruiker.type.toLowerCase : this.standaardTypeChecked, Validators.required],
      foto: [this.huidigeGebruiker ? this.huidigeGebruiker.foto : '', valideerBestandType]
    },
    {
      validator: this.MustMatch('wachtwoord', 'bevestigWachtwoord')
    }
    );
    this.submitButtonText = this.huidigeGebruiker ? 'Aanpassen' : 'Creëren';
  }
  onSubmit() {
    this.submitted = true;

    if(this.huidigeGebruiker) {
      this.gebruikerFormGroup.controls.wachtwoord.setValue("tijdelijk");
      this.gebruikerFormGroup.controls.bevestigWachtwoord.setValue("tijdelijk");
      this.gebruikerFormGroup.controls.gebruikerType.setValue(this.huidigeGebruiker.type);
      if(!this.gebruikerFormGroup.controls.foto.value && this.huidigeGebruiker) {
         this.gebruikerFormGroup.controls.foto.setValue(this.huidigeGebruiker.foto);
      }
    }
    // stop het process hier als de form invalid is
    if (this.gebruikerFormGroup.invalid) {
      return;
    }

    // maak bestandnaam uniek
    const bestandNaam = this.gebruikerFormGroup.controls.voornaam.value + '_'
      + this.gebruikerFormGroup.controls.achternaam.value + '.'
      + this.gebruikerFormGroup.controls.foto.value.name.split('.')[1];
    // folder naam voor bestand
    const folderNaam = 'gebruiker-foto';

    // bewaar alle gebruiker gegevens in een object
    var nieuweGebruiker;
    if(this.huidigeGebruiker) {
      nieuweGebruiker = {
        gebruikerId: this.huidigeGebruiker.gebruikerId,
        achternaam: this.gebruikerFormGroup.controls.achternaam.value,
        voornaam: this.gebruikerFormGroup.controls.voornaam.value,
        email: this.gebruikerFormGroup.controls.email.value,
        foto: folderNaam + "/" + bestandNaam,
        type: this.huidigeGebruiker.type
      }
    } else {
    nieuweGebruiker = {
      gebruikerId: '',
      achternaam: this.gebruikerFormGroup.controls.achternaam.value,
      voornaam: this.gebruikerFormGroup.controls.voornaam.value,
      email: this.gebruikerFormGroup.controls.email.value,
      password: this.gebruikerFormGroup.controls.wachtwoord.value,
      passwordConfirmation: this.gebruikerFormGroup.controls.bevestigWachtwoord.value,
      foto: folderNaam + '/' + bestandNaam,
      type: this.gebruikerFormGroup.controls.gebruikerType.value
    };
    }

    // Uploaden van de foto
    this.bestandService.postFile(folderNaam, bestandNaam, this.gebruikerFormGroup.controls.foto.value)
      .subscribe(x =>
        {
          console.log(x);
        }, (err) => {
          console.log(err);
        });

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
          if (
            this.hasRequiredField(
              abstractControl['controls'][controlName]
            )
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private MustMatch(controlString: string, confirmString: string): void | any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlString];
      const matchingControl = formGroup.controls[confirmString];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
