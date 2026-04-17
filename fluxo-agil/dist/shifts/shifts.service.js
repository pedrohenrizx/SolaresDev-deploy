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
exports.ShiftsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shift_entity_1 = require("./shift.entity");
let ShiftsService = class ShiftsService {
    shiftsRepository;
    constructor(shiftsRepository) {
        this.shiftsRepository = shiftsRepository;
    }
    findAll() {
        return this.shiftsRepository.find({ relations: ['assignedUser'] });
    }
    findOne(id) {
        return this.shiftsRepository.findOne({ where: { id }, relations: ['assignedUser'] });
    }
    async findCriticalUnassigned() {
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24);
        return this.shiftsRepository.find({
            where: {
                assignedUser: (0, typeorm_2.IsNull)(),
                startTime: (0, typeorm_2.LessThan)(tomorrow),
            },
        });
    }
    async findByUserId(userId) {
        return this.shiftsRepository.find({
            where: { assignedUser: { id: userId } },
        });
    }
    async create(shift) {
        const newShift = this.shiftsRepository.create(shift);
        return this.shiftsRepository.save(newShift);
    }
    async update(id, shift) {
        await this.shiftsRepository.update(id, shift);
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error('Shift not found');
        }
        return updated;
    }
    async setAvailableForExchange(id, available) {
        await this.shiftsRepository.update(id, { availableForExchange: available });
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error('Shift not found');
        }
        return updated;
    }
};
exports.ShiftsService = ShiftsService;
exports.ShiftsService = ShiftsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shift_entity_1.Shift)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShiftsService);
//# sourceMappingURL=shifts.service.js.map