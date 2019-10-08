export interface User {
    naam: string;
    foto: string;
    authoriteit: string;
    stateClient: stateClient;
}

export enum stateClient {
    'aanwezig', 'afwezig', 'ziek'
}
