import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  role: string; // 'manager' or 'professional'

  @Column({ nullable: true })
  specialization: string;

  @Column({ default: 40 })
  weeklyHourLimit: number;

  @Column({ type: 'datetime', nullable: true })
  documentExpirationDate: Date;
}
