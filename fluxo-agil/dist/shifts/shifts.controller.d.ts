import { ShiftsService } from './shifts.service';
import { Shift } from './shift.entity';
export declare class ShiftsController {
    private readonly shiftsService;
    constructor(shiftsService: ShiftsService);
    create(shift: Partial<Shift>): Promise<Shift>;
    findAll(): Promise<Shift[]>;
    findCriticalUnassigned(): Promise<Shift[]>;
    findByUser(userId: string): Promise<Shift[]>;
    findOne(id: string): Promise<Shift>;
    setAvailableForExchange(id: string, available: boolean): Promise<Shift>;
}
