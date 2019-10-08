import { User } from './user.interface';

export interface Atelier {
  naam: string;
  begeleider: Array<User>;
  clienten: Array<User>;
}
