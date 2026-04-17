"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exchange_entity_1 = require("./exchange.entity");
const users_service_1 = require("../users/users.service");
const shifts_service_1 = require("../shifts/shifts.service");
let ExchangesService = class ExchangesService {
    exchangesRepository;
    usersService;
    shiftsService;
    constructor(exchangesRepository, usersService, shiftsService) {
        this.exchangesRepository = exchangesRepository;
        this.usersService = usersService;
        this.shiftsService = shiftsService;
    }
    async requestExchange(shiftId, requesterId, substituteId) {
        const shift = await this.shiftsService.findOne(shiftId);
        if (!shift || !shift.availableForExchange) {
            throw new common_1.BadRequestException('Shift is not available for exchange');
        }
        const requester = await this.usersService.findOne(requesterId);
        const substitute = await this.usersService.findOne(substituteId);
        if (!requester || !substitute) {
            throw new common_1.BadRequestException('Invalid users');
        }
        const request = this.exchangesRepository.create({
            shift,
            requester,
            substitute,
            status: 'pending',
        });
        return this.exchangesRepository.save(request);
    }
    async approveExchange(exchangeId) {
        const exchange = await this.exchangesRepository.findOne({
            where: { id: exchangeId },
            relations: ['shift', 'requester', 'substitute'],
        });
        if (!exchange) {
            throw new common_1.BadRequestException('Exchange request not found');
        }
        if (exchange.status !== 'pending') {
            throw new common_1.BadRequestException('Exchange already processed');
        }
        exchange.status = 'approved';
        await this.exchangesRepository.save(exchange);
        await this.shiftsService.update(exchange.shift.id, {
            assignedUser: exchange.substitute,
            availableForExchange: false,
        });
        return exchange;
    }
    async rejectExchange(exchangeId) {
        const exchange = await this.exchangesRepository.findOneBy({ id: exchangeId });
        if (!exchange) {
            throw new common_1.BadRequestException('Exchange request not found');
        }
        exchange.status = 'rejected';
        return this.exchangesRepository.save(exchange);
    }
    findAllPending() {
        return this.exchangesRepository.find({
            where: { status: 'pending' },
            relations: ['shift', 'requester', 'substitute'],
        });
    }
};
exports.ExchangesService = ExchangesService;
exports.ExchangesService = ExchangesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exchange_entity_1.ExchangeRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        shifts_service_1.ShiftsService])
], ExchangesService);
//# sourceMappingURL=exchanges.service.js.map