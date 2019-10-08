export interface User {
    naam: string;
    foto: string;
    rol: Rol;
    stateClient?: stateClient;
}

export enum stateClient {
    'aanwezig', 'afwezig', 'ziek'
}

export enum Rol {
    "begeleider",
    "cliënt",
    "stagiair",
    "vrijwilliger"
}