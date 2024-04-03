import { Injectable, Logger } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}
  async createHistory(dto: CreateHistoryDto) {
    try {
      const history = this.historyRepository.create(dto);
      const savedHistory = await this.historyRepository.save(history);
      this.logger.log(`Created history with ID ${savedHistory.id}`);
      return savedHistory;
    } catch (error) {
      this.logger.error(`Failed to create history: ${error.message}`);
      throw new Error('Failed to create history');
    }
  }

  async findAllHistory() {
    return await this.historyRepository.find();
  }
}
