import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { Shift } from './shift.entity';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  create(@Body() shift: Partial<Shift>): Promise<Shift> {
    return this.shiftsService.create(shift);
  }

  @Get()
  findAll(): Promise<Shift[]> {
    return this.shiftsService.findAll();
  }

  @Get('critical')
  findCriticalUnassigned(): Promise<Shift[]> {
    return this.shiftsService.findCriticalUnassigned();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Shift[]> {
    return this.shiftsService.findByUserId(+userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Shift> {
    const shift = await this.shiftsService.findOne(+id);
    if (!shift) {
      throw new Error('Shift not found');
    }
    return shift;
  }

  @Put(':id/availableForExchange')
  setAvailableForExchange(
    @Param('id') id: string,
    @Body('available') available: boolean,
  ): Promise<Shift> {
    return this.shiftsService.setAvailableForExchange(+id, available);
  }
}
