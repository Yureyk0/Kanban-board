import { Board } from 'src/boards/entities/board.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ name: 'board_id' })
  boardId: string;

  @ManyToOne(() => Board, (board: Board) => board.lists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
