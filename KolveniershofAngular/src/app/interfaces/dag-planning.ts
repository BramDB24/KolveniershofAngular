import { IDagAtelier } from './dag-atelier';

export interface IDagPlanning {
    eten: string;
    datum: string;
    weeknummer: number;
    weekdag: number;
    dagplanningId: number;
    dagAteliers: Array<IDagAtelier>;

    getDagAteliersOpDagMoment(dagMoment: number);
}
