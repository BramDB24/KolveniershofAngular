import { DagAtelier } from './dag-atelier.model';

export class DagPlanning {
  eten: string;
  datum: string;
  weeknummer: number;
  weekdag: number;
  dagplanningId: number;
  dagAteliers: DagAtelier[];

  public getDagAteliersOpDagMoment(dagMoment: string): DagAtelier[] {
    return this.dagAteliers.filter(
      dagAtelier => dagAtelier.dagMoment === dagMoment
    );
  }

  public getVoormiddagAteliers(): Array<DagAtelier> {
    return this.dagAteliers.filter(d => d.dagMoment === 'Voormiddag');
  }

  public getNamiddagAteliers(): Array<DagAtelier> {
    return this.dagAteliers.filter(d => d.dagMoment === 'Namiddag');
  }

  public getVolledigedagAteliers(): Array<DagAtelier> {
    return this.dagAteliers.filter(d => d.dagMoment === 'VolledigeDag');
  }

  public getEten(): String {
    return this.eten;
  }

  public getSpecialeAteliers(): Array<DagAtelier> {
    return this.dagAteliers.filter(
      d =>
        d.atelier.atelierType === 'Ziek' ||
        d.atelier.atelierType === 'Afwezig' ||
        d.atelier.atelierType === 'VervoerAtelier' ||
        d.atelier.atelierType === 'Thuis'
    );
  }
}
