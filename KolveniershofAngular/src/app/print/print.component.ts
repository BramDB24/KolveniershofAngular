import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as printJS from 'print-js';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
        printable: 'print',
        type: 'html',
        honorColor: true,
        targetStyles: ['*'],
        ignoreElements: ['nietPrinten']
    });
}

}
