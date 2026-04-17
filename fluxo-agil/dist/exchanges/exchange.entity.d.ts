import { Shift } from '../shifts/shift.entity';
import { User } from '../users/user.entity';
export declare class ExchangeRequest {
    id: number;
    shift: Shift;
    requester: User;
    substitute: User;
    status: string;
}
