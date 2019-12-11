import { Commentaar } from './commentaar.model';

export class Gebruiker {
    gebruikerId?: string;
    voornaam: string;
    achternaam: string;
    email: string;
    wachtwoord?: string;
    foto: string;
    type: string;
    sfeergroep?: string;
    commentaren?: Commentaar[];
}
