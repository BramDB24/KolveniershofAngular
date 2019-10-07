import { User } from './user.interface';

export interface Atelier {
  name: string;
  guide: Array<User>;
  clients: Array<User>;
}
