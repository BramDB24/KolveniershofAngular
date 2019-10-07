export interface User {
    name: string;
    picture: string;
    role: Rol;
}

export enum Rol {
    "begeleider",
    "cliënt",
    "stagiair",
    "vrijwilliger"
}