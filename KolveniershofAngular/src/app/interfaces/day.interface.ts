import { User } from './user.interface';
import { Atelerier } from './atelier.interface';

export interface Day {
  gebruikers: Array<User>;
  datum: Date;
  voormiddag: Array<Atelerier>;
  namiddag: Array<Atelerier>;
  middag: string;
  opmerkingen?: Array<string>;
}
