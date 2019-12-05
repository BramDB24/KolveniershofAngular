import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Atelier } from '../models/atelier.model';
import { AtelierService } from '../services/atelier.service';

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
    public errorMessage = "";
    public successMessage = "";

    @ViewChild(FileUploadComponent) child: FileUploadComponent;

    constructor(
        private atelierService: AtelierService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initialiseerFormGroup();
        this.atelierService.getAteliers().subscribe(entry => {
            this.ateliers = entry.sort((a, b) => a.naam.localeCompare(b.naam))
        });
    }

    private initialiseerFormGroup() {
        this.atelierFormGroup = this.fb.group({
            atelierNaam: ['',  Validators.required],
            picto: new FormControl(null, [
                Validators.required,
                requiredFileType('jpg'),
            ]),
        });

        this.atelierVerwijderenFormGroup = this.fb.group({
            teVerwijderenAtelier: ['', Validators.required],
        });
    }


    saveAtelier() {
        this.successMessage == ""
        this.errorMessage == ""
        this.submittedSave = true;
        if (this.atelierFormGroup.invalid) {
            return;
        }

        this.atelierService
            .postAtelier({
                naam: this.atelierFormGroup.value.atelierNaam,
                atelierType: 'Gewoon',
                pictoURL: 'TIJDELIJKE URL', // de juiste: this.atelierFormGroup.value.picto
            })
            .pipe(
                uploadProgress(progress => (this.progress = progress)),
                toResponseBody()
            )
            .subscribe(
                () => {
                    
                },
                err => {
                    console.log(err);
                    this.errorMessage = 
                        'Er was een probleem bij het opslaan van de aanpassing.\n' +
                            'Een techische beschrijving over te fout werd in de console geschreven.'
                    ;
                },
                () => {
                    this.successMessage = 'De aanpassingen zijn opgeslagen';
                    this.progress = 0;
                    this.atelierFormGroup.reset();
                    this.submittedSave = false;
                }
            );
    }

    deleteAtelier() {
        this.submittedDelete = true;
        if (this.atelierVerwijderenFormGroup.invalid) {
            return;
        }

        const naam = this.atelierVerwijderenFormGroup.controls
            .teVerwijderenAtelier.value;
        const atelierTeVerwijderen = this.ateliers.find(a => a.naam === naam);

        if (
            confirm(
                'Bent u zeker dat u dit atelier permanent wilt verwijderen?'
            )
        ) {
            this.atelierService
                .deleteAtelier(atelierTeVerwijderen.atelierId)
                .subscribe(
                    () => {},
                    err => {
                        console.log(err);
                        alert(
                            'Er was een probleem bij het opslaan van de aanpassing.\n' +
                                'Een techische beschrijving over te fout werd in de console geschreven.'
                        );
                    },
                    () => {
                        alert('De aanpassingen zijn opgeslagen');
                        this.submittedDelete = false;
                    }
                );
            const index = this.ateliers.indexOf(atelierTeVerwijderen);
            if (index > -1) {
                this.ateliers.splice(index, 1);
            }
        }
    }
}

export function requiredFileType(type: string) {
    return function(control: FormControl) {
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
