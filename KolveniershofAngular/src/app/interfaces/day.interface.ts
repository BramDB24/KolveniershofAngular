import { User } from './user.interface';
import { Atelerier } from './atelier.interface';

export interface Day {
  users: Array<User>;
  date: Date;
  beforenoon: Array<Atelerier>;
  afternoon: Array<Atelerier>;
  noon: string;
  remarks?: Array<string>;
}
