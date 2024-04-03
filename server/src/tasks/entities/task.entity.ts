import { Audit } from 'src/audit/entities/audit.entity';
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

  @OneToMany(() => Audit, (audit) => audit.task, {
    eager: true,
  })
  audit: Audit[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
