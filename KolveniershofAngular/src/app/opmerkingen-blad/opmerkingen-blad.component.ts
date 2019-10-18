import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OpmerkingenService } from '../services/opmerkingen.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IOpmerking } from '../interfaces/opmerking';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Opmerking } from '../models/opmerking';
import { OpmerkingType } from '../enums/opmerking-type.enum';

@Component({
  selector: 'app-opmerkingen-blad',
  templateUrl: './opmerkingen-blad.component.html',
  styleUrls: ['./opmerkingen-blad.component.scss']
})
export class OpmerkingenBladComponent implements OnChanges, OnInit {

  @Input() public datum: Date;
  public opmerkingen = Array<IOpmerking>();

  public loaded = false;
  public opmerkingForm: FormGroup[];
  // = [this.fb.group({
  //   tekst: ["test", Validators.required]
  // })];
  //public opmerkingType: string;

  constructor(private opmerkingenService: OpmerkingenService, private fb: FormBuilder) { }

  ngOnInit() {

  }

  public initFormGroups() {
    this.opmerkingForm = new Array<FormGroup>();
    for (let i = 0; i < this.opmerkingen.length; i++) {
      this.opmerkingForm[i] = this.fb.group({
        tekst: [this.opmerkingen[i].tekst, Validators.required]
      })
    }
  }

  ngOnChanges() {
    this.callAlleOpmerkingen(this.datum);
  }

  public callAlleOpmerkingen(date: Date): void {
    this.opmerkingenService.GetOpmerkingenVanSpecifiekeDag$(date)
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe(
        entry => {
          entry.forEach(e => this.opmerkingen.push(e));
          this.initFormGroups();
        })
  }

  onSubmit(opmerking: Opmerking, i: number) {
    console.log("submitted gelukt");

    this.opmerkingenService.postOpmerking(
      opmerking.opmerkingId, {
      tekst: this.opmerkingForm[i].controls.tekst.value,
      opmerkingType: opmerking.opmerkingType,
      datum: this.datum.toJSON()
    }).subscribe();
  }
}




