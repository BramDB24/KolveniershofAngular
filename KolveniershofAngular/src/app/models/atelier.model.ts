import { IAtelier } from '../interfaces/atelier';

export class Atelier implements IAtelier {
    atelierId?: number;
    atelierType: number;
    naam: string;

    constructor(json: any) {
        this.atelierId = json.aterlierId;
        this.atelierType = json.atelierType;
        this.naam = json.naam;
    }

}
