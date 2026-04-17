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
exports.ExchangesController = void 0;
const common_1 = require("@nestjs/common");
const exchanges_service_1 = require("./exchanges.service");
let ExchangesController = class ExchangesController {
    exchangesService;
    constructor(exchangesService) {
        this.exchangesService = exchangesService;
    }
    requestExchange(shiftId, requesterId, substituteId) {
        return this.exchangesService.requestExchange(shiftId, requesterId, substituteId);
    }
    findAllPending() {
        return this.exchangesService.findAllPending();
    }
    approveExchange(id) {
        return this.exchangesService.approveExchange(+id);
    }
    rejectExchange(id) {
        return this.exchangesService.rejectExchange(+id);
    }
};
exports.ExchangesController = ExchangesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('shiftId')),
    __param(1, (0, common_1.Body)('requesterId')),
    __param(2, (0, common_1.Body)('substituteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "requestExchange", null);
__decorate([
    (0, common_1.Get)('pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "findAllPending", null);
__decorate([
    (0, common_1.Put)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "approveExchange", null);
__decorate([
    (0, common_1.Put)(':id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangesController.prototype, "rejectExchange", null);
exports.ExchangesController = ExchangesController = __decorate([
    (0, common_1.Controller)('exchanges'),
    __metadata("design:paramtypes", [exchanges_service_1.ExchangesService])
], ExchangesController);
//# sourceMappingURL=exchanges.controller.js.map