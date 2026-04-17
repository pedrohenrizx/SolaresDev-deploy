import { User } from '../users/user.entity';
export declare class Shift {
    id: number;
    sector: string;
    startTime: Date;
    endTime: Date;
    status: string;
    availableForExchange: boolean;
    assignedUser: User;
}
