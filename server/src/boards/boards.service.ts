import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  private readonly logger = new Logger(BoardsService.name);
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  create(createBoardDto: CreateBoardDto) {
    const board: Board = new Board();
    board.orderIndex = new Date().getTime();
    board.nameBoard = createBoardDto.nameBoard;
    this.logger.log(`Created board with ID ${board.id}`);
    return this.boardRepository.save(board);
  }

  async findAll() {
    const boards = await this.boardRepository.find({
      order: { lists: { orderIndex: 'ASC' } },
    });

    return boards.map((board) => ({
      id: board.id,
      orderIndex: board.orderIndex,
      nameBoard: board.nameBoard,
    }));
  }

  async findOne(id: string) {
    return await this.boardRepository.findOne({
      where: { id },
      order: { lists: { orderIndex: 'ASC' } },
    });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    await this.boardRepository.update(id, updateBoardDto);
    this.logger.log(`Updated board with ID ${id}`);
    return this.boardRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      this.logger.error(`List with ID ${id} not found`);
      throw new NotFoundException('List not found');
    }
    this.logger.log(`Deleted board with ID ${id}`);
    return result;
  }
}
