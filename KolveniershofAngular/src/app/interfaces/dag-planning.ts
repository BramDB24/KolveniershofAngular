import { DagAtelier } from './dag-atelier';

export interface DagPlanning {
    eten: string;
    datum: string;
    weeknummer: number;
    weekdag: number;
    dagplanningId: number;
    dagAteliers: Array<DagAtelier>;
}
