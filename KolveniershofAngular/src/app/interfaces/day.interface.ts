import { Gebruiker } from './gebruiker.interface';

export interface Day {
    users: Array<Gebruiker>;
    date: Date;
    beforenoon: Array<string>;
    afternoon: Array<string>;
    noon: string;
    remarks?: Array<string>;
}
