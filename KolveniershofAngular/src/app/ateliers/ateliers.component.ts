import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ValidatorFn,
} from '@angular/forms';
import { pipe } from 'rxjs';
import { filter, map, tap, finalize } from 'rxjs/operators';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Atelier } from '../models/atelier.model';
import { AtelierService } from '../services/atelier.service';
import { ActivatedRoute } from '@angular/router';
import { BestandService } from '../services/bestand.service';

function valideerBestandType(verplicht = true): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
        const foto = control.value.name;
        if (!foto) {
            if (verplicht) {
                return { required: true };
            } else {
                return null;
            }
        }
        if (foto.split('.').length !== 2) {
            return { wrongFileType: true };
        }
        const extentie = foto.split('.')[1];
        if (!['jpg', 'png', 'jpeg'].includes(extentie.toLowerCase())) {
            return { wrongFileType: true };
        }
        return null;
    };
}

@Component({
    selector: 'app-ateliers',
    templateUrl: './ateliers.component.html',
    styleUrls: ['./ateliers.component.scss'],
})
export class AteliersComponent implements OnInit {
    public progress = 0;
    public atelierFormGroup: FormGroup;
    public atelierVerwijderenFormGroup: FormGroup;
    public ateliers: Array<Atelier> = [];
    public fileInputTypes: Array<string> = ['png', 'jpg', 'jpeg'];
    public submittedSave = false;
    public submittedDelete = false;
    public loader = false;
    public huidigAtelier: Atelier;
    public titelTekst: string;
    public errorMessage = '';
    public successMessage = '';

    constructor(
        private route: ActivatedRoute,
        private bestandService: BestandService,
        private atelierService: AtelierService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.atelierService.getAteliers().subscribe(entry => {
            this.ateliers = entry.sort((a, b) => a.naam.localeCompare(b.naam));
            this.initialiseerFormGroup();
        });
        this.route.params.subscribe(
            params => {
                if (params.id) {
                    this.atelierService
                        .getAtelierViaId(params.id)
                        .pipe(
                            finalize(() => {
                                this.loader = true;
                            })
                        )
                        .subscribe(
                            atelier => {
                                this.huidigAtelier = atelier;
                            },
                            err => {
                                alert(
                                    'Er was een error bij het ophalen van het atelier.'
                                );
                                console.log(err);
                            },
                            () => {
                                this.initialiseerFormGroup();
                            }
                        );
                } else {
                    this.huidigAtelier = null;
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
        this.atelierFormGroup = this.fb.group({
            atelierNaam: [
                this.huidigAtelier ? this.huidigAtelier.naam : '',
                Validators.required,
            ],
            picto: [
                this.huidigAtelier ? this.huidigAtelier.pictoURL : '',
                [valideerBestandType(this.huidigAtelier === null)]
            ],
        });

        this.titelTekst = this.huidigAtelier ? 'aanpassen' : 'toevoegen';
    }

    saveAtelier() {
        this.successMessage == '';
        this.errorMessage == '';
        this.submittedSave = true;
        if (this.atelierFormGroup.invalid) {
            return;
        }

        let pictoUrl = this.huidigAtelier ? this.huidigAtelier.pictoURL : null;

        if (this.atelierFormGroup.controls.picto.value.name) {
            pictoUrl = this.atelierFormGroup.controls.picto.value.name;
            // folder naam voor bestand
            const folderNaam = 'pictos';
            // Uploaden van de foto
            this.bestandService.postFile(
                folderNaam,
                pictoUrl,
                this.atelierFormGroup.controls.picto.value
            ).subscribe(
                () => { },
                err => { console.log(err); },
                () => {
                }
            );
        }
        if (this.huidigAtelier) {
            this.atelierService
                .updateAtelier({
                    atelierId: this.huidigAtelier.atelierId,
                    naam: this.atelierFormGroup.value.atelierNaam,
                    atelierType: this.huidigAtelier.atelierType,
                    pictoURL: pictoUrl,
                })
                .subscribe(
                    () => { },
                    err => {
                        console.log(err);
                        this.errorMessage =
                            'Er was een probleem bij het aanmaken van het atelier.\n' +
                            'Een technische beschrijving over te fout werd in de console geschreven.';
                    },
                    () => {
                        this.successMessage = 'Het atelier werd aangepast';
                        this.progress = 0;
                    }
                );
        } else {
            console.log(this.atelierFormGroup.value.picto.name)
            this.atelierService
                .postAtelier({
                    naam: this.atelierFormGroup.value.atelierNaam,
                    atelierType: 'Gewoon',
                    pictoURL: this.atelierFormGroup.value.picto.name // de juiste: this.atelierFormGroup.value.picto
                })
                .pipe(
                    uploadProgress(progress => (this.progress = progress)),
                    toResponseBody()
                )
                .subscribe(
                    () => { },
                    err => {
                        console.log(err);
                        this.errorMessage =
                            'Er was een probleem bij het opslaan van het atelier.\n' +
                            'Een technische beschrijving over te fout werd in de console geschreven.';
                    },
                    () => {
                        this.successMessage = 'Het atelier werd opgeslagen.';
                        this.progress = 0;
                        this.submittedSave = false;
                        this.atelierFormGroup.reset();
                    }
                );
        }
    }
}

export function requiredFileType(type: string) {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const extension = file.name.split('.')[1].toLowerCase();
            if (type.toLowerCase() !== extension.toLowerCase()) {
                return {
                    requiredFileType: true,
                };
            }
            return null;
        }
        return null;
    };
}

export function uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
        if (event.type === HttpEventType.UploadProgress) {
            cb(Math.round((100 * event.loaded) / event.total));
        }
    });
}

export function toResponseBody<T>() {
    return pipe(
        filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
        map((res: HttpResponse<T>) => res.body)
    );
}
