import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { List } from './lists/entities/list.entity';
import { ListsModule } from './lists/lists.module';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { History } from './history/entities/history.entity';
import { HistoryModule } from './history/history.module';
import { BoardsModule } from './boards/boards.module';
import * as cors from 'cors';
import { Board } from './boards/entities/board.entity';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env', //TO DO: dev or prod
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: parseInt(config.get('POSTGRES_PORT')),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DATABASE'),
        entities: [List, Task, History, Board],
        synchronize: true,
      }),
    }),
    ListsModule,
    TasksModule,
    HistoryModule,
    BoardsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // дозволені HTTP методи
        }),
      )
      .forRoutes('*');
  }
}
