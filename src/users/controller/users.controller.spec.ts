import { UsersService } from '../service/users.service';
import { User } from '../model/user.model';
import { UsersController } from './users.controller';
import { Model } from 'mongoose';

describe('UsersController', () => {
  let model: Model<User>;
  let usersService: UsersService;
  let usersController: UsersController;

  beforeEach(async () => {
    usersService = new UsersService(model);
    usersController = new UsersController(usersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersController.getAllUsers).toBeDefined();
    expect(usersController.getUserById).toBeDefined();
    expect(usersController.deleteUserById).toBeDefined();
  });
});
