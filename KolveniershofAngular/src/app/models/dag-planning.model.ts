import { IDagAtelier } from '../interfaces/dag-atelier';
import { IDagPlanning } from '../interfaces/dag-planning';
import { DagAtelier } from './dag-atelier.model';
import { DagMoment } from '../enums/dag-moment.enum';

export class DagPlanning {
    eten: string;
    datum: string;
    weeknummer: number;
    weekdag: number;
    dagplanningId: number;
    dagAteliers: DagAtelier[];

    // constructor(json: any) {
    //     this.eten = json.eten;
    //     this.datum = json.datum;
    //     this.weeknummer = json.weeknummer;
    //     this.weekdag = json.weekdag;
    //     this.dagplanningId = json.dagplanningId;
    //     this.dagAteliers = new Array<IDagAtelier>();
    //     json.dagAteliers.forEach(entry => {
    //         this.dagAteliers.push(new DagAtelier(entry));
    //     });
    // }

    public getDagAteliersOpDagMoment(dagMoment: number): IDagAtelier[] {
        return this.dagAteliers.filter(dagAtelier => dagAtelier.dagMoment === dagMoment);
    }

    public getVoormiddagAteliers(): Array<DagAtelier> {
        return this.dagAteliers.filter(d => d.dagMoment === DagMoment.Voormiddag);
    }

    public getNamiddagAteliers(): Array<DagAtelier> {
        return this.dagAteliers.filter(d => d.dagMoment === DagMoment.Namiddag);
    }
    public getVolledigedagAteliers(): Array<DagAtelier> {
        return this.dagAteliers.filter(d => d.dagMoment === DagMoment.VolledigeDag);
    }

}
