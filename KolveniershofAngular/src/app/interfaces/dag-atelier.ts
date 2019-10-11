import { Atelier } from './atelier';
import { Gebruiker } from './gebruiker';

export interface DagAtelier {
    dagAtelierId: number;
    dagMoment: number;
    atelier: Atelier;
    gebruikers: Array<Gebruiker>;
}
