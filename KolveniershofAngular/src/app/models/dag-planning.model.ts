import { DagMoment } from '../enums/dag-moment.enum';
import { DagAtelier } from './dag-atelier.model';

export class DagPlanning {
  eten: string;
  datum: string;
  weeknummer: number;
  weekdag: number;
  dagplanningId: number;
  dagAteliers: DagAtelier[];

  public getDagAteliersOpDagMoment(dagMoment: number): DagAtelier[] {
    return this.dagAteliers.filter(
      dagAtelier => dagAtelier.dagMoment === dagMoment
    );
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

  public getSpecialeAteliers(): Array<DagAtelier> {
    return this.dagAteliers.filter(
      d =>
        d.atelier.naam === 'ziek' ||
        d.atelier.naam === 'afwezig' ||
        d.atelier.naam === 'vervoer' ||
        d.atelier.naam === 'thuis verlof'
    );
  }
}
