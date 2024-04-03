import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSubscriber } from './subscribers/task.subscriber';
import { AuditService } from 'src/audit/audit.service';
import { Audit } from 'src/audit/entities/audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Audit])],
  controllers: [TasksController],
  providers: [TasksService, TaskSubscriber, AuditService],
})
export class TasksModule {}
