import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Shift } from '../shifts/shift.entity';
import { User } from '../users/user.entity';

@Entity()
export class ExchangeRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shift)
  shift: Shift;

  @ManyToOne(() => User)
  requester: User;

  @ManyToOne(() => User)
  substitute: User;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'
}
