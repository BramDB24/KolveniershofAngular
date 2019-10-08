import { User } from './user.interface';

export interface Atelerier {
  naam: string;
  begeleider: string;
  clienten: Array<User>;
}
