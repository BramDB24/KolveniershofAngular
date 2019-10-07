import { User } from './user.interface';
import { Atelier } from './atelier.interface';

export interface Day {
  users: Array<User>;
  date: Date;
  beforenoon: Array<Atelier>;
  afternoon: Array<Atelier>;
  noon: string;
  remarks?: Array<string>;
}
