import { List } from 'src/lists/entities/list.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListsService {
  private readonly logger = new Logger(ListsService.name);
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ) {}

  createList(createListDto: CreateListDto): Promise<List> {
    const list: List = new List();
    list.orderIndex = new Date().getTime();
    list.nameList = createListDto.nameList;
    list.boardId = createListDto.boardId;
    this.logger.log(`Created list with ID ${list.id}`);
    return this.listRepository.save(list);
  }

  findAllList(): Promise<List[]> {
    return this.listRepository.find({
      relations: { tasks: { audit: true } },
      order: { orderIndex: 'ASC' },
    });
  }
  async findOneList(id: string): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) {
      this.logger.error(`List with ID ${id} not found`);
      throw new NotFoundException('List not found');
    }
    return list;
  }

  async updateList(id: string, updateListDto: UpdateListDto) {
    await this.listRepository.update(id, updateListDto);
    this.logger.log(`Updated list with ID ${id}`);
    return this.listRepository.findOne({ where: { id } });
  }

  async removeList(id: string): Promise<void> {
    const result = await this.listRepository.delete(id);
    if (result.affected === 0) {
      this.logger.error(`List with ID ${id} not found`);
      throw new NotFoundException('List not found');
    }
    this.logger.log(`Deleted list with ID ${id}`);
  }
}
