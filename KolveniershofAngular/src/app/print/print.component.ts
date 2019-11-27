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
    printJS({
        printable: 'print',
        type: 'html',
        honorColor: true,
        targetStyles: ['*'],
        ignoreElements: ['nietPrinten']
    });
}

}
