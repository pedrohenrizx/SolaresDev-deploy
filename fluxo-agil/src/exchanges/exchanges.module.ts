import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';
import { ExchangeRequest } from './exchange.entity';
import { UsersModule } from '../users/users.module';
import { ShiftsModule } from '../shifts/shifts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeRequest]),
    UsersModule,
    ShiftsModule,
  ],
  providers: [ExchangesService],
  controllers: [ExchangesController],
})
export class ExchangesModule {}
