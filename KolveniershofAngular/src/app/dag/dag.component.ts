import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnChanges } from "@angular/core";
import { DagAtelier } from "../models/dag-atelier.model";
import { DagPlanning } from "../models/dag-planning.model";
import { DagService } from "../services/dag.service";
import * as jsPDF from 'jspdf';
import * as printJS from 'print-js';
import html2canvas from 'html2canvas';


@Component({
  selector: "app-dag",
  templateUrl: "./dag.component.html",
  styleUrls: ["./dag.component.scss"]
})
export class DagComponent implements OnChanges {
  // Geeft ons de input van de het kalender component
  @Input() public datum: Date;
  @Input() public geselecteerdeWeekdag: number;
  @Input() public geselecteerdeWeek: number;
  public loadingError: HttpErrorResponse;
  public loading = false;
  public bool = false;
  public dagplanning: DagPlanning;
  public specialeAteliers = new Array<DagAtelier>();

  constructor(private dagService: DagService) {}

  ngOnChanges() {
    if (this.datum == null) {
      this.haalDagplanningTemplateOpMetWeekdagEnWeek(
        this.geselecteerdeWeek,
        this.geselecteerdeWeekdag
      );
    } else {
      this.haalDagplanningOpMetDatum(this.datum);
    }
  }

  public haalDagplanningTemplateOpMetWeekdagEnWeek(
    week: number,
    weekdag: number
  ) {
    this.dagService.getDagTemplate(week, weekdag).subscribe(
      dag => {
        this.dagplanning = Object.assign(new DagPlanning(), dag);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      },
      () => {
        this.loading = true;
      }
    );
  }

  downloadPDF() {
    /*let pdf = new jsPDF('p', 'mm', 'a4');
  pdf.text = 
  var pageHeight= pdf.internal.pageSize.height;
  var data = document.getElementById('printVolledigeDag');  
  html2canvas(data).then(canvas => {  
  // Few necessary setting options  
  var imgWidth = 208;   
  var pageHeight = 295;    
  var imgHeight = canvas.height * imgWidth / canvas.width;  
  var heightLeft = imgHeight;  

  const contentDataURL = canvas.toDataURL('image/png')  
  var position = 0;  
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  pdf.addPage()
  
  data = document.getElementById('printVoormiddag');  
  html2canvas(data).then(canvas => {  
  // Few necessary setting options  
  var imgWidth = 208;   
  var pageHeight = 295;    
  var imgHeight = canvas.height * imgWidth / canvas.width;  
  var heightLeft = imgHeight;  

  const contentDataURL = canvas.toDataURL('image/png')  
  var position = 0;  
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  pdf.save('MYPdf.pdf'); // Generated PDF   
  });  
  });  
*/
    printJS({
        printable: 'printVolledigeDag',
        type: 'html',
        honorColor: true,
        targetStyles: ['*'],
        ignoreElements: ['nietPrinten']
    });
}

  public haalDagplanningOpMetDatum(date: Date) {
    this.dagService.getDag(date).subscribe(
      dag => {
        this.dagplanning = Object.assign(new DagPlanning(), dag);
        this.setDagMoment();
      },
      error => {
        this.loadingError = error;
      },
      () => {
        this.loading = true;
      }
    );
  }

  public setDagMoment(): void {
    this.dagplanning
      .getDagAteliersOpDagMoment('Undefined')
      .forEach(entry => {
        if (
          entry.atelier.atelierType === "Afwezig" ||
          entry.atelier.atelierType === "Ziek" ||
          entry.atelier.atelierType === "VervoerAtelier"
        ) {
          this.specialeAteliers.push(entry);
        }
      });
  }

  public toonSpecialeAteliers(): void {
    this.bool = !this.bool;
  }
}
