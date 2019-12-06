import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { pipe } from "rxjs";
import { filter, map, tap, finalize } from "rxjs/operators";
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { Atelier } from "../models/atelier.model";
import { AtelierService } from "../services/atelier.service";
import { ActivatedRoute } from "@angular/router";

function valideerBestandType(control: FormControl): { [key: string]: any } {
  if (!control.value.picto) {
    return;
  }
  const foto = control.value.picto;
  if (!foto) {
    return { required: true };
  }
  if (foto.split(".").length !== 2) {
    return { wrongFileType: true };
  }
  const extentie = foto.split(".")[1];
  if (!["jpg", "png", "jpeg"].includes(extentie.toLowerCase())) {
    return { wrongFileType: true };
  }
  return null;
}

@Component({
  selector: "app-ateliers",
  templateUrl: "./ateliers.component.html",
  styleUrls: ["./ateliers.component.scss"]
})
export class AteliersComponent implements OnInit {
  public progress = 0;
  public atelierFormGroup: FormGroup;
  public atelierVerwijderenFormGroup: FormGroup;
  public ateliers: Array<Atelier> = [];
  public fileInputTypes: Array<string> = ["png", "jpg", "jpeg"];
  public submittedSave = false;
  public submittedDelete = false;
  public loader = false;
  public huidigAtelier: Atelier;
  public titelTekst: string;

  @ViewChild(FileUploadComponent) child: FileUploadComponent;

  constructor(
    private route: ActivatedRoute,
    private atelierService: AtelierService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.atelierService.getAteliers().subscribe(entry => {
      this.ateliers = entry;
      this.initialiseerFormGroup();
      //entry.forEach(e => this.ateliers.push(Object.assign(new Atelier(), e)));
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
                alert("Er was een error bij het ophalen van het atelier.");
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
        alert("Er was een error bij laden van de pagina.");
        console.log(err);
      }
    );
    this.initialiseerFormGroup();
  }

  private initialiseerFormGroup() {
    this.atelierFormGroup = this.fb.group({
      atelierNaam: [
        this.huidigAtelier ? this.huidigAtelier.naam : "",
        Validators.required
      ],
      picto: new FormControl(this.huidigAtelier ? this.huidigAtelier.pictoURL : '', [Validators.required, valideerBestandType])
    });

    this.titelTekst = this.huidigAtelier ? "aanpassen" : "toevoegen";
  }

  saveAtelier() {
    this.submittedSave = true;
    if (this.atelierFormGroup.invalid) {
      return;
    }

    if (this.huidigAtelier) {
      this.atelierService
      .updateAtelier({
        atelierId: this.huidigAtelier.atelierId,
        naam: this.atelierFormGroup.value.atelierNaam,
        atelierType: this.huidigAtelier.atelierType,
        pictoURL: this.atelierFormGroup.value.picto.name
      })
      .subscribe(
        () => {},
        err => {
          console.log(err);
          alert(
            "Er was een probleem bij het aanmaken van het atelier.\n" +
              "Een technische beschrijving over te fout werd in de console geschreven."
          );
        },
        () => {
          alert("Het atelier werd aangepast");
          this.progress = 0;
        }
      );
    } else {
      this.atelierService
        .postAtelier({
          naam: this.atelierFormGroup.value.atelierNaam,
          atelierType: "Gewoon",
          pictoURL: this.atelierFormGroup.value.picto.name // de juiste: this.atelierFormGroup.value.picto
        })
        .pipe(
          uploadProgress(progress => (this.progress = progress)),
          toResponseBody()
        )
        .subscribe(
          () => {},
          err => {
            console.log(err);
            alert(
              "Er was een probleem bij het opslaan van het atelier.\n" +
                "Een technische beschrijving over te fout werd in de console geschreven."
            );
          },
          () => {
            alert("Het atelier werd opgeslagen.");
            this.progress = 0;
          }
        );
    }
  }
}

export function requiredFileType(type: string) {
  return function(control: FormControl) {
    const file = control.value;
    if (file) {
      const extension = file.name.split(".")[1].toLowerCase();
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
