import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DagService } from '../services/dag.service';
import { DagPlanning } from '../models/dag-planning.model';


@Component({
  selector: 'app-homepage-edit-maaltijd',
  templateUrl: './homepage-edit-maaltijd.component.html',
  styleUrls: ['./homepage-edit-maaltijd.component.scss']
})
export class HomepageEditMaaltijdComponent implements OnInit, OnChanges {
  @Input() public dagPlanning: DagPlanning;
  @Output() public newDagPlanningAddedEvent = new EventEmitter();
  public maaltijdFormGroup: FormGroup;
  public submitted = false;
  public initform = false;

  constructor(
    private dagService: DagService,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
      this.initialiseerFormGroup();
  }

  ngOnInit() {
    this.initialiseerFormGroup();
  }

  private initialiseerFormGroup() {
    this.maaltijdFormGroup = this.fb.group({
      maaltijd: [
        this.dagPlanning.eten, this.valideerMaaltijd.bind(this)
      ]
    });
    this.initform = true;
  }

  public onSubmit(): void {
    this.submitted = true;

    // stop het process hier als de form invalid is
    if (this.maaltijdFormGroup.invalid) {
      return;
    }
      this.dagService
      .postEten(this.dagPlanning.dagplanningId, this.maaltijdFormGroup.controls.maaltijd.value)
      .subscribe(
        entry => {},
        err => {
          alert(
            'Er was een probleem bij het opslaan van de aanpassing.\n' +
              'Een techische beschrijving over te fout werd in de console geschreven.'
          );
        },
        () => {
          this.newDagPlanningAddedEvent.emit();
          alert('De aanpassingen zijn opgeslagen');
        }
      );
  }

  private valideerMaaltijd(control: FormControl): { [key: string]: any } {
    const maaltijd = control.value;
    if (!maaltijd) {
      return { maaltijdIngevuld: 'Voeg een maaltijd toe!' };
    }
    return null;
  }

  public maaltijdFormErrors(): string[] {
    const errors = this.maaltijdFormGroup.controls.maaltijd.errors;
    const errorBerichten: string[] = [];
    Object.keys(errors).forEach(key => {
      errorBerichten.push(errors[key]);
    });
    return errorBerichten;
  }

}
