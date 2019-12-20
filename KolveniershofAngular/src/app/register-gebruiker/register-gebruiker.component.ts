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
    styleUrls: ['./register-gebruiker.component.scss'],
})
export class RegisterGebruikerComponent implements OnInit {
    public gebruikerFormGroup: FormGroup;
    public huidigeGebruiker: Gebruiker;
    public gebruikerTypes: string[] = ['Admin', 'Begeleider', 'Cliënt'];
    public sfeergroepen: string[] = [
        'Sfeergroep1',
        'Sfeergroep2',
        'Sfeergroep3',
    ];
    public submitButtonText: string;
    public submitted = false;
    public fototijdelijk: string;
    public isClient = false;

    constructor(
        private gebruikerService: GebruikerService,
        private bestandService: BestandService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                if (params.id) {
                    this.gebruikerService
                        .getGebruikerViaId(params.id)
                        .subscribe(
                            user => {
                                this.huidigeGebruiker = user;
                            },
                            err => {
                                alert(
                                    'Er was een error bij het ophalen van de gebruiker.'
                                );
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
        this.initialiseerFormGroup();
    }

    private initialiseerFormGroup() {
        this.gebruikerFormGroup = this.fb.group(
            {
                achternaam: [
                    this.huidigeGebruiker
                        ? this.huidigeGebruiker.achternaam
                        : '',
                    Validators.required,
                ],
                voornaam: [
                    this.huidigeGebruiker ? this.huidigeGebruiker.voornaam : '',
                    Validators.required,
                ],
                email: [
                    this.huidigeGebruiker ? this.huidigeGebruiker.email : '',
                    [Validators.required, Validators.email],
                ],
                wachtwoord: [
                    this.huidigeGebruiker ? 'tijdelijk' : '',
                    [Validators.required],
                ],
                bevestigWachtwoord: [
                    this.huidigeGebruiker ? 'tijdelijk' : '',
                    [Validators.required],
                ],
                gebruikerType: [
                    this.huidigeGebruiker
                        ? this.huidigeGebruiker.type
                        : 'Cliënt',
                    Validators.required,
                ],
                foto: [
                    this.huidigeGebruiker ? this.huidigeGebruiker.foto : '',
                    valideerBestandType,
                ],
                sfeergroep: [
                    this.huidigeGebruiker
                        ? this.huidigeGebruiker.sfeergroep
                        : '',
                    Validators.required,
                ],
            },
            {
                validator: this.MustMatch('wachtwoord', 'bevestigWachtwoord'),
            }
        );
        this.submitButtonText = this.huidigeGebruiker ? 'Aanpassen' : 'Creëren';
        if (this.huidigeGebruiker && this.huidigeGebruiker.type === 'Cliënt') {
            this.isClient = true;
        }
    }

    public checkClient(gebruikertype: string) {
        return gebruikertype === 'Cliënt'
            ? (this.isClient = true)
            : (this.isClient = false);
    }

    onSubmit() {
        this.submitted = true;

        if (this.gebruikerFormGroup.controls.gebruikerType.value !== 'Cliënt') {
            this.gebruikerFormGroup.controls.sfeergroep.setValue('Undefined');
        }

        // stop het process hier als de form invalid is
        if (this.gebruikerFormGroup.invalid) {
            return;
        }

        // maak bestandnaam uniek
        const bestandNaam =
            this.gebruikerFormGroup.controls.voornaam.value +
            '_' +
            this.gebruikerFormGroup.controls.achternaam.value +
            '.' +
            this.gebruikerFormGroup.controls.foto.value.name.split('.')[1];
        // folder naam voor bestand
        const folderNaam = 'gebruiker-foto';

        // bewaar alle gebruiker gegevens in een object
        let nieuweGebruiker;
        if (this.huidigeGebruiker) {
            nieuweGebruiker = {
                id: this.huidigeGebruiker.id,
                achternaam: this.gebruikerFormGroup.controls.achternaam.value,
                voornaam: this.gebruikerFormGroup.controls.voornaam.value,
                email: this.gebruikerFormGroup.controls.email.value,
                foto: bestandNaam,
                type: this.gebruikerFormGroup.controls.gebruikerType.value,
                sfeergroep: this.gebruikerFormGroup.controls.sfeergroep.value,
            };
        } else {
            nieuweGebruiker = {
                id: '',
                achternaam: this.gebruikerFormGroup.controls.achternaam.value,
                voornaam: this.gebruikerFormGroup.controls.voornaam.value,
                email: this.gebruikerFormGroup.controls.email.value,
                password: this.gebruikerFormGroup.controls.wachtwoord.value,
                passwordConfirmation: this.gebruikerFormGroup.controls
                    .bevestigWachtwoord.value,
                foto: bestandNaam,
                type: this.gebruikerFormGroup.controls.gebruikerType.value,
                sfeergroep: this.gebruikerFormGroup.controls.sfeergroep.value,
            };
        }

        // Uploaden van de foto
        this.bestandService.postFile(
            folderNaam,
            bestandNaam,
            this.gebruikerFormGroup.controls.foto.value
        );

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

    private MustMatch(
        controlString: string,
        confirmString: string
    ): void | any {
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
