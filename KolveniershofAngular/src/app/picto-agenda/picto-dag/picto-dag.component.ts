import {
    Component,
    OnInit,
    Input,
    ViewChild,
    Output,
    EventEmitter,
} from '@angular/core';
import { PictoDag } from 'src/app/models/pictodag.model';
import { PictoAtelier } from 'src/app/models/pictoatelier.model';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { Commentaar } from 'src/app/models/commentaar.model';
import { CommentaarService } from 'src/app/services/commentaar.service';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-picto-dag',
    templateUrl: './picto-dag.component.html',
    styleUrls: ['./picto-dag.component.scss'],
})
export class PictoDagComponent implements OnInit {
    @Input() public pictodag: PictoDag;
    @Input() public dagImg: string;
    @Input() public isWeekend: boolean;
    @Input() public selected: boolean;
    @Input() public commentaar: string;
    @Output() public opgeslaan = new EventEmitter<any>();
    public submitted = false;

    constructor() {}

    ngOnInit() {}

    get voormiddag(): PictoAtelier[] {
        return this.pictodag.ateliers.filter(
            a => a.dagMoment === 'Voormiddag' || a.dagMoment === 'VolledigeDag'
        );
    }

    get namiddag(): PictoAtelier[] {
        return this.pictodag.ateliers.filter(
            a => a.dagMoment === 'Namiddag' || a.dagMoment === 'VolledigeDag'
        );
    }

    public opslaanCommentaar(pictodag: PictoDag) {
        this.submitted = true;
        if (this.submitted && this.commentaar == null) {
            alert('Je kan geen lege commentaar indienen');
            return;
        }
        this.opgeslaan.emit({
            date: this.pictodag.datum,
            commentaar: this.commentaar.toString(),
        });
    }

    public getUrl(): string {
        return `${environment.imageUrl}`;
    }

    public getGebruikerUrl(): string {
        return `${environment.gebruikerUrl}`;
    }
}
