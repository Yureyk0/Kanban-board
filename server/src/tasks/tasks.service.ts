import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(dto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(dto);
      const savedTask = await this.taskRepository.save(task);
      this.logger.log(`Created task with ID ${savedTask.id}`);
      return savedTask;
    } catch (error) {
      this.logger.error(`Failed to create task: ${error.message}`);
      throw new Error('Failed to create task');
    }
  }

  async findAllTasks() {
    return await this.taskRepository.find({ relations: { history: true } });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      await this.taskRepository.update(id, updateTaskDto);
      const updatedTask = this.taskRepository.findOne({ where: { id } });
      if (!updatedTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      this.logger.log(`Updated task with ID ${id}`);
      return updatedTask;
    } catch (error) {
      this.logger.error(
        `Failed to update task with ID ${id}: ${error.message}`,
      );
      throw new Error('Failed to update task');
    }
  }

  async removeTask(id: string): Promise<void> {
    try {
      const result = await this.taskRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      this.logger.log(`Deleted task with ID ${id}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete task with ID ${id}: ${error.message}`,
      );
      throw new Error('Failed to delete task');
    }
  }
  async findOneTask(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      this.logger.error(`Failed to find task with ID ${id}: ${error.message}`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
