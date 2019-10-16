import { IDagAtelier } from '../interfaces/dag-atelier';
import { Atelier } from './atelier.model';
import { Gebruiker } from '../interfaces/gebruiker';
import { GebruikerType } from '../enums/gebruiker-type.enum';

export class DagAtelier implements IDagAtelier {
    dagAtelierId?: number;
    dagMoment: number;
    atelier: Atelier;
    gebruikers: Gebruiker[];

    constructor(json: any) {
        this.dagAtelierId = json.dagAtelierId;
        this.dagMoment = json.dagMoment;
        this.atelier = new Atelier(json.atelier);
        this.gebruikers = json.gebruikers;
    }

    getBegeleiders(): Gebruiker[] {
        const begeleiders: Gebruiker[] = [];
        this.gebruikers.forEach(gebruiker => {
            if (gebruiker.type === GebruikerType.Begeleider || gebruiker.type === GebruikerType.Admin) {
                begeleiders.push(gebruiker);
            }
        });
        return begeleiders;
    }

    getClienten(): Gebruiker[] {
        const cliënten: Gebruiker[] = [];
        this.gebruikers.forEach(gebruiker => {
            if (gebruiker.type === GebruikerType.Cliënt) {
                cliënten.push(gebruiker);
            }
        });
        return cliënten;
    }
}
