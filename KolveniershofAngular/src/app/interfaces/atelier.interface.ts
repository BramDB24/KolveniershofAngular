import { User } from './user.interface';

export interface Atelerier {
  name: string;
  guide: string;
  clients: Array<User>;
}
