import { Model } from 'mongoose';
import { User } from 'src/users/model/user.model';
import { UsersService } from '../../users/service/users.service';
import { Task } from '../model/task.model';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let userModel: Model<User>;
  let taskModel: Model<Task>;
  let usersService: UsersService;
  let tasksService: TasksService;

  beforeEach(async () => {
    usersService = new UsersService(userModel);
    tasksService = new TasksService(taskModel, usersService);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
    expect(tasksService.create).toBeDefined();
    expect(tasksService.deleteAllTasks).toBeDefined();
    expect(tasksService.deleteTask).toBeDefined();
    expect(tasksService.findAll).toBeDefined();
    expect(tasksService.getOneTask).toBeDefined();
    expect(tasksService.updateTask).toBeDefined();
  });
});
