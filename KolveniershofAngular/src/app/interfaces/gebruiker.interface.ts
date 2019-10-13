export interface Gebruiker {
    id: string;
    achternaam: string;
    voornaam: string;
    achternaamOuder?: string;
    voornaamOuder?: string;
    email: string;
    wachtwoord: string;
    straat: string;
    huisnummer: string;
    busnummer?: string;
    gemeente: string;
    postcode: string;
    foto: string;
    type: number;
}
