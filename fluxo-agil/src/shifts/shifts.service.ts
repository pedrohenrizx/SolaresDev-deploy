import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, IsNull } from 'typeorm';
import { Shift } from './shift.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private shiftsRepository: Repository<Shift>,
  ) {}

  findAll(): Promise<Shift[]> {
    return this.shiftsRepository.find({ relations: ['assignedUser'] });
  }

  findOne(id: number): Promise<Shift | null> {
    return this.shiftsRepository.findOne({ where: { id }, relations: ['assignedUser'] });
  }

  // Dashboard: Shifts without professionals in <24h
  async findCriticalUnassigned(): Promise<Shift[]> {
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);

    return this.shiftsRepository.find({
      where: {
        assignedUser: IsNull(),
        startTime: LessThan(tomorrow),
      },
    });
  }

  async findByUserId(userId: number): Promise<Shift[]> {
    return this.shiftsRepository.find({
      where: { assignedUser: { id: userId } },
    });
  }

  async create(shift: Partial<Shift>): Promise<Shift> {
    const newShift = this.shiftsRepository.create(shift);
    return this.shiftsRepository.save(newShift);
  }

  async update(id: number, shift: Partial<Shift>): Promise<Shift> {
    await this.shiftsRepository.update(id, shift);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error('Shift not found');
    }
    return updated;
  }

  async setAvailableForExchange(id: number, available: boolean): Promise<Shift> {
    await this.shiftsRepository.update(id, { availableForExchange: available });
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error('Shift not found');
    }
    return updated;
  }
}
