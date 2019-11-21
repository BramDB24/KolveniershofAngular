import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';

@Component({
    selector: 'app-picto-page',
    templateUrl: './picto-page.component.html',
    styleUrls: ['./picto-page.component.scss'],
})
export class PictoPageComponent implements OnInit {
    public weekdagen = new Array<string>('Ma', 'Di', 'Woe', 'Do', 'Vr');
    public weekendDagen = new Array<string>('Zat', 'Zon');
    public isWeekend = false;

    constructor() {}

    ngOnInit() {}

    public switchWeekendState(): void {
        this.isWeekend = !this.isWeekend;
    }

    public displayDagen(): Array<string> {
        return this.isWeekend ? this.weekendDagen : this.weekdagen;
    }

    public windBack(): void {
        setTimeout(() => {
            document.getElementById('matForm').classList.remove('mat-focused');
        }, 0);
    }

    public windForward(): void {
        setTimeout(() => {
            document.getElementById('matForm').classList.remove('mat-focused');
        }, 0);
    }
}
