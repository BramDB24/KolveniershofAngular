import { Commentaar } from './commentaar.model';

export class Gebruiker {
    id?: string;
    voornaam: string;
    achternaam: string;
    email: string;
    wachtwoord?: string;
    foto: string;
    type: string;
    sfeergroep?: string;
    commentaren?: Commentaar[];
}
