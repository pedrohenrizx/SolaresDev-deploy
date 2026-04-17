import { Repository } from 'typeorm';
import { Shift } from './shift.entity';
export declare class ShiftsService {
    private shiftsRepository;
    constructor(shiftsRepository: Repository<Shift>);
    findAll(): Promise<Shift[]>;
    findOne(id: number): Promise<Shift | null>;
    findCriticalUnassigned(): Promise<Shift[]>;
    findByUserId(userId: number): Promise<Shift[]>;
    create(shift: Partial<Shift>): Promise<Shift>;
    update(id: number, shift: Partial<Shift>): Promise<Shift>;
    setAvailableForExchange(id: number, available: boolean): Promise<Shift>;
}
