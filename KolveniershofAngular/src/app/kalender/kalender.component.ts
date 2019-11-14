import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as printJS from 'print-js';
import html2canvas from 'html2canvas';

export enum State {
    Dag = 'dag',
    DagEdit = 'dagEdit',
    Opmerkingen = 'opmerkingen',
}

@Component({
    selector: 'app-kalender',
    templateUrl: './kalender.component.html',
    styleUrls: ['./kalender.component.scss'],
})
export class KalenderComponent implements OnInit {
    public datum: Date = new Date();

    public state = State.Dag;
    // StateType gelijk stellen aan enum State, anders kan html hier niet aan
    StateType = State;

    constructor(private _router: Router) {
        this.state = State.Dag;
    }

    public veranderState(type: State) {
        this.state = type;
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
        });
    }

    public veranderDatum(nr: number): void {
        if (this.state === State.DagEdit) {
            this.veranderState(State.Dag);
        }

        this.datum = new Date(
            this.datum.getFullYear(),
            this.datum.getMonth(),
            this.datum.getDate() + nr
        );
    }

    public vorigeDatum(): void {
        this.veranderDatum(-1);
    }

    public volgendeDatum(): void {
        this.veranderDatum(+1);
    }

    public redirect(route: string) {
        this._router.navigate([`${route}`]);
    }

    ngOnInit() {}
}
