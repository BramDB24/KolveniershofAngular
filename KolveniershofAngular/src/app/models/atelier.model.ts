import { IAtelier } from '../interfaces/atelier';

export class Atelier implements IAtelier {
    atelierId?: number;
    atelierType: number;
    naam: string;
    pictoURL: string;

    constructor(json: any) {
        this.atelierId = json.atelierId;
        this.atelierType = json.atelierType;
        this.naam = json.naam;
        this.pictoURL = json.pictoURL;
    }

}
