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
  public atelierVerwijderenFormGroup: FormGroup;
  public ateliers: Array<Atelier> = [];

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
        entry.forEach(e => this.ateliers.push(new Atelier(e)));
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
    this.atelierService.postAtelier({
      naam: this.atelierFormGroup.value.atelierNaam,
      atelierType: 4,
      pictoURL: "TIJDELIJKE INPUT" //this.atelierFormGroup.value.picto //

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

  deleteAtelier() {
    const naam = this.atelierVerwijderenFormGroup.controls.teVerwijderenAtelier.value;
    let atelierTeVerwijderen = this.ateliers.find(a => a.naam === naam);

    if (confirm("Bent u zeker dat u dit atelier permanent wilt verwijderen?")) {
      this.atelierService.deleteAtelier(atelierTeVerwijderen.atelierId)
        .subscribe(entry => { },
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
