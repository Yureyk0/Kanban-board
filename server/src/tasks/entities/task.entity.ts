import { History } from 'src/history/entities/history.entity';
import { List } from 'src/lists/entities/list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../../lists/entities/list.entity';
import { History } from '../../history/entities/history.entity';
import { AuditLog } from '../../audit/entities/audit-log.entity'; // Import AuditLog entity

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameTask: string;

  @Column()
  descriptionTask: string;

  @Column()
  priority: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dueDate: Date;

  @Column({ name: 'list_id' })
  listId: string;

  @ManyToOne(() => List, (list: List) => list.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'list_id' })
  list: List;

  @OneToMany(() => History, (history) => history.task, {
    eager: true,
  })
  history: History[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
