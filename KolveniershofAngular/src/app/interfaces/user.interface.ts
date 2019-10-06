export interface User {
    id: number;
    name: string;
    firstname: string;
    email: string;
    password: string;
    street: string;
    houseNumber: string;
    busnumber?: string;
    city: string;
    postcode: string;
    picture: string;
    type: number;
}
