import { User } from './user.interface';
import { Atelier } from './atelier.interface';

export interface Day {
  gebruikers: Array<User>;
  datum: Date;
  voormiddag: Array<Atelier>;
  namiddag: Array<Atelier>;
  middag: string;
  opmerkingen?: Array<string>;
}
