import { Task } from '../../tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'audit' })
export class Audit {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'entity_id', nullable: true })
  entityId: string;

  @Column({ type: 'jsonb', nullable: true })
  oldState: any;

  @Column({ type: 'jsonb' })
  newState: any;

  @Column()
  action: string; // 'insert', 'update', 'delete'

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Task, (task: Task) => task.audit, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'entity_id' })
  task: Task;
}
