import { ExchangesService } from './exchanges.service';
import { ExchangeRequest } from './exchange.entity';
export declare class ExchangesController {
    private readonly exchangesService;
    constructor(exchangesService: ExchangesService);
    requestExchange(shiftId: number, requesterId: number, substituteId: number): Promise<ExchangeRequest>;
    findAllPending(): Promise<ExchangeRequest[]>;
    approveExchange(id: string): Promise<ExchangeRequest>;
    rejectExchange(id: string): Promise<ExchangeRequest>;
}
