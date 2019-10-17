import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OpmerkingenService } from '../services/opmerkingen.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Opmerking } from '../interfaces/opmerking';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-opmerkingen-blad',
  templateUrl: './opmerkingen-blad.component.html',
  styleUrls: ['./opmerkingen-blad.component.scss']
})
export class OpmerkingenBladComponent implements OnInit {
  @Input() public datum: Date;
  public opmerkingFormGroup: FormGroup;
  public loadingError: HttpErrorResponse;
  public opmerkingen = Array<Opmerking>();
  public loaded = false;
  public opmerking: Opmerking;
  public huidigeOpmerking: Opmerking;
  public opmerkingInt: Number;

  constructor(private opmerkingenService: OpmerkingenService, private fb: FormBuilder) { }

  ngOnInit() {
    this.opmerkingenService.GetOpmerkingenVanSpecifiekeDag$(this.datum)
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe(
        entry =>
          entry.forEach(element =>
            this.opmerkingen.push(element)));
    // this.initializeerFormGroup();
  }

  // private initializeerFormGroup() {
  //   this.opmerkingFormGroup = this.fb.group({
  //     tekst: [this.opmerking ? this.opmerking.tekst : ''],
  //   }
  //   );
  // }

  // public onSubmit() {

  //   const nieuweOpmerking = {
  //     id: '',
  //     tekst: this.opmerkingFormGroup.controls.tekst.value
  //   };
  //   if (this.opmerking) {
  //     this.opmerkingInt = parseInt(nieuweOpmerking.id, 10);
  //     this.opmerkingInt = this.opmerking.opmerkingId;
  //   }


  //   // Stuur Opmerking naar de databank
  //   if (this.opmerking) {
  //     this.opmerkingenService.postUpdateOpmerking(nieuweOpmerking).subscribe((response) => {
  //       alert('Opmerking geüpdate.');
  //     });
  //   } else {
  //     this.opmerkingenService.postNieuweOpmerking(nieuweOpmerking).subscribe((response) => {
  //       alert('Opmerking toegevoegd.');
  //     });
  //   }
  // }

  public zetOpmerkingTypeEnumOmInTekst(enumNr) {//omzetten in pipemethod
    var enumNaarWaarde;
    switch (enumNr) {
      case 0: enumNaarWaarde = "Undefined"; break;
      case 1: enumNaarWaarde = "Vervoer"; break;
      case 2: enumNaarWaarde = "Cliënten"; break;
      case 3: enumNaarWaarde = "Ateliers en weekschema"; break;
      case 4: enumNaarWaarde = "Varia"; break;
      case 5: enumNaarWaarde = "Logistiek"; break;
      case 6: enumNaarWaarde = "Begeleiding"; break;
      case 7: enumNaarWaarde = "Stagiairs"; break;
      case 8: enumNaarWaarde = "Vrijwilligers"; break;
      case 9: enumNaarWaarde = "Uur registratie"; break;
      default: enumNaarWaarde = "Varia"; break;
    }
    return enumNaarWaarde;

  }

}
