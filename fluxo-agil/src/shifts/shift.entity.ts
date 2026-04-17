import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sector: string;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;

  @Column({ default: 'scheduled' })
  status: string; // 'scheduled', 'completed', 'unassigned'

  @Column({ default: false })
  availableForExchange: boolean;

  @ManyToOne(() => User, { nullable: true })
  assignedUser: User;
}
