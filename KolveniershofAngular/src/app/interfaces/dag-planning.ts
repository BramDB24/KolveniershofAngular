import { DagAtelier } from './dag-atelier';

export interface DagPlanning {
    eten: string;
    datum: string;
    dagplanningId: number;
    dagAteliers: Array<DagAtelier>;
}
