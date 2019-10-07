export interface Gebruiker {
    id: string;
    naam: string;
    voornaam: string;
    naamOuder?: string;
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
