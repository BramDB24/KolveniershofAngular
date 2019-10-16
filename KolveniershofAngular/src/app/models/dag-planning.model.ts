import { IDagAtelier } from '../interfaces/dag-atelier';
import { IDagPlanning } from '../interfaces/dag-planning';
import { DagAtelier } from './dag-atelier.model';

export class DagPlanning implements IDagPlanning {
    eten: string;
    datum: string;
    weeknummer: number;
    weekdag: number;
    dagplanningId: number;
    dagAteliers: IDagAtelier[];

    constructor(json: any) {
        this.eten = json.eten;
        this.datum = json.datum;
        this.weeknummer = json.weeknummer;
        this.weekdag = json.weekdag;
        this.dagplanningId = json.dagplanningId;
        this.dagAteliers = new Array<IDagAtelier>();
        json.dagAteliers.forEach(entry => {
            this.dagAteliers.push(new DagAtelier(entry));
        });
    }

    getDagAteliersOpDagMoment(dagMoment: number): IDagAtelier[] {
        return this.dagAteliers.filter(dagAtelier => dagAtelier.dagMoment === dagMoment);
    }

}
