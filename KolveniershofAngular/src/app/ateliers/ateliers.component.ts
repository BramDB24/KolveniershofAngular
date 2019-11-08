//used https://netbasal.com/how-to-implement-file-uploading-in-angular-reactive-forms-89a3fffa1a03
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Atelier } from '../models/atelier.model';
import { DagService } from '../services/dag.service';
import { finalize, tap, filter, map } from 'rxjs/operators';
import { AtelierService } from '../services/atelier.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.scss']
})
export class AteliersComponent implements OnInit {

  public progress = 0;
  public atelierFormGroup: FormGroup;
  public atelierVerwijderenFormGroup: FormGroup;
  public ateliers: Array<Atelier> = [];
  public fileInputTypes: Array<string> = ['png', 'jpg', 'jpeg'];

  @ViewChild(FileUploadComponent) child: FileUploadComponent;

  constructor(
    private atelierService: AtelierService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initialiseerFormGroup();
    this.atelierService
      .getAteliers()
      .subscribe(entry => {
        entry.forEach(e => this.ateliers.push(Object.assign(new Atelier(), e)));
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

  }

  private initialiseerFormGroup() {
    this.atelierFormGroup = this.fb.group({
      atelierNaam: ['', this.valideerAtelierNaam.bind(this)],
      picto: new FormControl(null, [Validators.required, requiredFileType('jpg')])
    });

    this.atelierVerwijderenFormGroup = this.fb.group({
      teVerwijderenAtelier: ['', this.valideerAtelierNaam.bind(this)],
    });
  }



  private valideerAtelierNaam(control: FormControl): { [key: string]: any } {
    const naam = control.value;
    if (!naam) {
      return { naamNietIngevuld: 'Voeg een atelier naam toe' };
    }
    return null;
  }

  saveAtelier() {
    console.log(this.atelierFormGroup.value.atelierNaam);
    console.log(this.atelierFormGroup.value.picto);
    this.atelierService.postAtelier({
      naam: this.atelierFormGroup.value.atelierNaam,
      atelierType: 4,
      pictoURL: "TIJDELIJKE URL" // de juiste: this.atelierFormGroup.value.picto
    })
      .pipe(
        uploadProgress(progress => (this.progress = progress)),
        toResponseBody()
      )
      .subscribe(
        err => {
          console.log(err);
          alert('Er was een probleem bij het opslaan van de aanpassing.\n'
            + 'Een techische beschrijving over te fout werd in de console geschreven.');
        },
        () => {
          alert('De aanpassingen zijn opgeslagen');
          this.progress = 0;
          this.atelierFormGroup.reset();
        });
  }

  deleteAtelier() {
    const naam = this.atelierVerwijderenFormGroup.controls.teVerwijderenAtelier.value;
    let atelierTeVerwijderen = this.ateliers.find(a => a.naam === naam);

    if (confirm("Bent u zeker dat u dit atelier permanent wilt verwijderen?")) {
      this.atelierService.deleteAtelier(atelierTeVerwijderen.atelierId)
        .subscribe(
          err => {
            console.log(err);
            alert('Er was een probleem bij het opslaan van de aanpassing.\n'
              + 'Een techische beschrijving over te fout werd in de console geschreven.');
          },
          () => {
            alert('De aanpassingen zijn opgeslagen');
          });
      const index = this.ateliers.indexOf(atelierTeVerwijderen);
      if (index > -1) {
        this.ateliers.splice(index, 1);

      }
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
          requiredFileType: true
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
