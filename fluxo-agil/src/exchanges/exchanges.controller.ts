import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ExchangeRequest } from './exchange.entity';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  requestExchange(
    @Body('shiftId') shiftId: number,
    @Body('requesterId') requesterId: number,
    @Body('substituteId') substituteId: number,
  ): Promise<ExchangeRequest> {
    return this.exchangesService.requestExchange(shiftId, requesterId, substituteId);
  }

  @Get('pending')
  findAllPending(): Promise<ExchangeRequest[]> {
    return this.exchangesService.findAllPending();
  }

  @Put(':id/approve')
  approveExchange(@Param('id') id: string): Promise<ExchangeRequest> {
    return this.exchangesService.approveExchange(+id);
  }

  @Put(':id/reject')
  rejectExchange(@Param('id') id: string): Promise<ExchangeRequest> {
    return this.exchangesService.rejectExchange(+id);
  }
}
