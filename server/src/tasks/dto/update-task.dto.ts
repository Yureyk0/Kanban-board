import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  nameTask?: string;
  descriptionTask?: string;
  priority?: string;
  listId?: string;
  dueData?: Date;
}
