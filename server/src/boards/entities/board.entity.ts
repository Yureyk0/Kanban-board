import { List } from '../../lists/entities/list.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', default: 0 })
  orderIndex: number;

  @Column()
  nameBoard: string;

  @OneToMany(() => List, (list) => list.board, {
    eager: true,
  })
  lists: List[];
}
