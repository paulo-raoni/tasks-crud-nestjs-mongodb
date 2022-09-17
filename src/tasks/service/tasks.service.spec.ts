import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.deleteAllTasks).toBeDefined();
    expect(service.deleteTask).toBeDefined();
    expect(service.findAll).toBeDefined();
    expect(service.getOneTask).toBeDefined();
    expect(service.updateTask).toBeDefined();
  });
});
