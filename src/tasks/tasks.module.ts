import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './model/task.model';
import { TasksController } from './controller/tasks.controller';
import { TasksService } from './service/tasks.service';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
