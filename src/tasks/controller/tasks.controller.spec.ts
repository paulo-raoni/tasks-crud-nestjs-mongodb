import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
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

  // if('should be called', () => {
  //   expect(controller.createOneTask).
  // });
});
