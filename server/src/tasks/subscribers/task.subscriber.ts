import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  DataSource,
  AfterUpdate,
  AfterInsert,
  BeforeRemove,
} from 'typeorm';
import { Task } from '../entities/task.entity';
import { AuditService } from 'src/audit/audit.service';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  constructor(
    private readonly auditService: AuditService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  @AfterInsert()
  async afterInsert(event: InsertEvent<Task>) {
    this.auditService.create({
      entityId: event.entity.id,
      oldState: null,
      newState: event.entity,
      action: 'insert',
    });
  }

  @AfterUpdate()
  async beforeUpdate(event: UpdateEvent<Task>) {
    const oldState = this.mapObject(event.databaseEntity as Task);
    const newState = this.mapObject(event.entity as Task);

    this.auditService.create({
      entityId: event.databaseEntity.id,
      oldState,
      newState,
      action: 'update',
    });
  }

  @BeforeRemove()
  async beforeRemove(event: RemoveEvent<Task>) {
    const newState = this.mapObject(event.entity as Task);

    this.auditService.create({
      entityId: null,
      oldState: null,
      newState: newState,
      action: 'delete',
    });
  }

  private mapObject(entity: Task): Partial<Task> {
    return {
      id: entity.id,
      nameTask: entity.nameTask,
      descriptionTask: entity.descriptionTask,
      priority: entity.priority,
      dueDate: entity.dueDate,
      listId: entity.listId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
