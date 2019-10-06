import { User } from './user.interface';

export interface Day {
    users: Array<User>;
    date: Date;
    beforenoon: Array<string>;
    afternoon: Array<string>;
    noon: string;
    remarks?: Array<string>;
}
