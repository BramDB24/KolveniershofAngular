import { Gebruiker } from './gebruiker';
import { Atelier } from '../models/atelier.model';

export interface IDagAtelier {
    dagAtelierId?: number;
    dagMoment: number;
    atelier: Atelier;
    gebruikers: Array<Gebruiker>;
    getBegeleiders(): Gebruiker[];
    getClienten(): Gebruiker[];
}
