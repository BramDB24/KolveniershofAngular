export interface Gebruiker {
    id: string;
    voornaam: string;
    achternaam: string;
    commentaren: Array<string>;
    email: string;
    sfeergroep: number;
    straatnaam: string;
    huisnummer: string;
    busnummer: string;
    gemeente: string;
    postcode: string;
    type: number;
    foto: string;
}
