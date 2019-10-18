import { OpmerkingType } from '../enums/opmerking-type.enum';

export interface IOpmerking {
  opmerkingId?: number;
  opmerkingType: number;
  tekst: string;
  datum: Date;
}
