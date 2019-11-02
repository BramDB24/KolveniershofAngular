import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Atelier } from '../models/atelier.model';
import { DagService } from '../services/dag.service';
import { finalize } from 'rxjs/operators';
import { AtelierService } from '../services/atelier.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.scss']
})
export class AteliersComponent implements OnInit {

  public atelierFormGroup: FormGroup;
  @ViewChild(FileUploadComponent) child: FileUploadComponent;

  constructor(
    private atelierService: AtelierService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initialiseerFormGroup();

  }

  private initialiseerFormGroup() {
    this.atelierFormGroup = this.fb.group({
      atelierNaam: ['', this.valideerAtelierNaam.bind(this)],
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
    this.atelierService.postAtelier({
      naam: this.atelierFormGroup.value.atelierNaam,
      atelierType: 4,
      pictoURL: "TIJDELIJKE INPUT"

    }).subscribe(entry => { },
      err => {
        console.log(err);
        alert('Er was een probleem bij het opslaan van de aanpassing.\n'
          + 'Een techische beschrijving over te fout werd in de console geschreven.');
      },
      () => {
        alert('De aanpassingen zijn opgeslagen');
      });
  }
}
