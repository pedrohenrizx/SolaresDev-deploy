import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRequest } from './exchange.entity';
import { UsersService } from '../users/users.service';
import { ShiftsService } from '../shifts/shifts.service';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectRepository(ExchangeRequest)
    private exchangesRepository: Repository<ExchangeRequest>,
    private usersService: UsersService,
    private shiftsService: ShiftsService,
  ) {}

  async requestExchange(shiftId: number, requesterId: number, substituteId: number): Promise<ExchangeRequest> {
    const shift = await this.shiftsService.findOne(shiftId);
    if (!shift || !shift.availableForExchange) {
      throw new BadRequestException('Shift is not available for exchange');
    }

    const requester = await this.usersService.findOne(requesterId);
    const substitute = await this.usersService.findOne(substituteId);

    if (!requester || !substitute) {
      throw new BadRequestException('Invalid users');
    }

    const request = this.exchangesRepository.create({
      shift,
      requester,
      substitute,
      status: 'pending',
    });

    return this.exchangesRepository.save(request);
  }

  async approveExchange(exchangeId: number): Promise<ExchangeRequest> {
    const exchange = await this.exchangesRepository.findOne({
      where: { id: exchangeId },
      relations: ['shift', 'requester', 'substitute'],
    });

    if (!exchange) {
      throw new BadRequestException('Exchange request not found');
    }

    if (exchange.status !== 'pending') {
      throw new BadRequestException('Exchange already processed');
    }

    // Here we could add logic to check interjornada (11h) and weekly limits
    // Assuming simple logic for MVP

    exchange.status = 'approved';
    await this.exchangesRepository.save(exchange);

    // Update the shift with the new assigned user
    await this.shiftsService.update(exchange.shift.id, {
      assignedUser: exchange.substitute,
      availableForExchange: false,
    });

    return exchange;
  }

  async rejectExchange(exchangeId: number): Promise<ExchangeRequest> {
    const exchange = await this.exchangesRepository.findOneBy({ id: exchangeId });
    if (!exchange) {
      throw new BadRequestException('Exchange request not found');
    }

    exchange.status = 'rejected';
    return this.exchangesRepository.save(exchange);
  }

  findAllPending(): Promise<ExchangeRequest[]> {
    return this.exchangesRepository.find({
      where: { status: 'pending' },
      relations: ['shift', 'requester', 'substitute'],
    });
  }
}
