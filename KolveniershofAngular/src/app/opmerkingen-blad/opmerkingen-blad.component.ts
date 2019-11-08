import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Opmerking } from '../models/opmerking';
import { OpmerkingenService } from '../services/opmerkingen.service';

@Component({
  selector: 'app-opmerkingen-blad',
  templateUrl: './opmerkingen-blad.component.html',
  styleUrls: ['./opmerkingen-blad.component.scss']
})
export class OpmerkingenBladComponent implements OnChanges {
  @Input() public datum: Date;
  public opmerkingen = Array<Opmerking>();

  public loaded = false;
  public opmerkingForm: FormGroup[];

  constructor(
    private opmerkingenService: OpmerkingenService,
    private fb: FormBuilder
  ) { }

  public initFormGroups() {
    this.opmerkingForm = new Array<FormGroup>();
    for (let i = 0; i < this.opmerkingen.length; i++) {
      this.opmerkingForm[i] = this.fb.group({
        tekst: [this.opmerkingen[i].tekst, Validators.required]
      });
    }
  }

  ngOnChanges() {
    this.callAlleOpmerkingen(this.datum);
  }

  public callAlleOpmerkingen(date: Date): void {
    this.opmerkingen = [];
    this.opmerkingenService
      .GetOpmerkingenVanSpecifiekeDag$(date)
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe(entry => {
        entry.forEach(e => this.opmerkingen.push(e));
        this.initFormGroups();
      });
  }

  onSubmit() {
    console.log("submitbutton pressed");
    for (let i = 0; i < this.opmerkingForm.length; i++) {
      this.opmerkingenService.putOpmerking({
        opmerkingId: this.opmerkingen[i].opmerkingId,
        tekst: this.opmerkingForm[i].controls.tekst.value,
        opmerkingType: this.opmerkingen[i].opmerkingType,
        datum: this.datum.toJSON()
      }
      ).subscribe();

    }
    alert("Je gegevens werden succesvol opgeslagen!");
  }
}
