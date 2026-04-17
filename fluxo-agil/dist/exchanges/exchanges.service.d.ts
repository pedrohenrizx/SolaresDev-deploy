import { Repository } from 'typeorm';
import { ExchangeRequest } from './exchange.entity';
import { UsersService } from '../users/users.service';
import { ShiftsService } from '../shifts/shifts.service';
export declare class ExchangesService {
    private exchangesRepository;
    private usersService;
    private shiftsService;
    constructor(exchangesRepository: Repository<ExchangeRequest>, usersService: UsersService, shiftsService: ShiftsService);
    requestExchange(shiftId: number, requesterId: number, substituteId: number): Promise<ExchangeRequest>;
    approveExchange(exchangeId: number): Promise<ExchangeRequest>;
    rejectExchange(exchangeId: number): Promise<ExchangeRequest>;
    findAllPending(): Promise<ExchangeRequest[]>;
}
