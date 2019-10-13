export interface Gebruiker {
    id?: string;
    voornaam: string;
    achternaam: string;
    commentaren: Array<string>;
    achternaamOuder?: string;
    voornaamOuder?: string;
    email: string;
    wachtwoord: string;
    sfeergroep: number;
    straatnaam: string;
    huisnummer: string;
    busnummer?: string;
    gemeente: string;
    postcode: string;
    foto: string;
    type: number;
}
