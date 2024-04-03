import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'history' })
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  historyContent: string;

  @Column({ name: 'task_id', nullable: true })
  taskId: string;

  @ManyToOne(() => Task, (task: Task) => task.history, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
