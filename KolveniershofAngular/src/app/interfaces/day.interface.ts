import { User } from './user.interface';

export interface Day {
    users: Array<User>;
    date: Date;
}