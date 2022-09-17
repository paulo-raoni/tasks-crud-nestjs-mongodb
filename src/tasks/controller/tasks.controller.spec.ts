import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../users/users.module';
import { TasksService } from '../service/tasks.service';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;

  /**
   * This is broken. Need to be checked.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.createOneTask).toBeDefined();
    expect(controller.getAllTasks).toBeDefined();
    expect(controller.getOneTask).toBeDefined();
    expect(controller.updateTask).toBeDefined();
    expect(controller.deleteTask).toBeDefined();
    expect(controller.deleteAllTasks).toBeDefined();
  });

});
