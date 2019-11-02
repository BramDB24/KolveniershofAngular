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
  // = [this.fb.group({
  //   tekst: ["test", Validators.required]
  // })];
  //public opmerkingType: string;

  constructor(
    private opmerkingenService: OpmerkingenService,
    private fb: FormBuilder
  ) {}

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
    console.log(this.datum);
    this.opmerkingenService
      .GetOpmerkingenVanSpecifiekeDag$(date)
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe(entry => {
        entry.forEach(e => this.opmerkingen.push(e));
        this.initFormGroups();
      });
    console.log(this.opmerkingen);
  }

  onSubmit(opmerking: Opmerking, i: number) {
    console.log('submitted gelukt');

    this.opmerkingenService
      .postOpmerking(opmerking.opmerkingId, {
        tekst: this.opmerkingForm[i].controls.tekst.value,
        opmerkingType: opmerking.opmerkingType,
        datum: this.datum.toJSON()
      })
      .subscribe();
    alert('Je gegevens werden succesvol opgeslagen!');
  }
}
