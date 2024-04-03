import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lists' })
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameList: string;

  @Column({ type: 'bigint', default: 0 })
  orderIndex: number;

  @OneToMany(() => Task, (task) => task.list, {
    eager: true,
  })
  tasks: Task[];
}
