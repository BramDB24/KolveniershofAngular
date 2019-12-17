import { DagAtelier } from './dag-atelier.model';

export class DagPlanning {
  eten: string;
  datum: string;
  weeknummer: number;
  weekdag: number;
  dagplanningId: number;
  dagAteliers: DagAtelier[];
  commentaar: string;

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

  public getSpecialeAteliers(): Array<DagAtelier> {
    return this.dagAteliers.filter(
      d =>
        d.atelier.atelierType === 'Ziek' ||
        d.atelier.atelierType === 'Afwezig' ||
        d.atelier.atelierType === 'Thuis'
    );
  }

  public getVervoerAteliers(): Array<DagAtelier> {
    return this.dagAteliers.filter(
      d =>
        d.atelier.atelierType === 'VervoerAtelier'
    );
  }
}
