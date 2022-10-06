import { Model } from 'mongoose';
import { User } from 'src/users/model/user.model';
import { UsersService } from '../../users/service/users.service';
import { Task } from '../model/task.model';
import { TasksService } from '../service/tasks.service';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let userModel: Model<User>;
  let taskModel: Model<Task>;
  let usersService: UsersService;
  let tasksService: TasksService;
  let tasksController: TasksController;

  beforeEach(async () => {
    usersService = new UsersService(userModel);
    tasksService = new TasksService(taskModel, usersService);
    tasksController = new TasksController(tasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
    expect(tasksController.createOneTask).toBeDefined();
    expect(tasksController.getAllTasks).toBeDefined();
    expect(tasksController.getOneTask).toBeDefined();
    expect(tasksController.updateTask).toBeDefined();
    expect(tasksController.deleteTask).toBeDefined();
    expect(tasksController.deleteAllTasks).toBeDefined();
  });

});
