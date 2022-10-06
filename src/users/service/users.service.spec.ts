import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let model: Model<User>;
  let usersService: UsersService;

  beforeEach(async () => {
    usersService = new UsersService(model);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersService.create).toBeDefined();
    expect(usersService.deleteUserById).toBeDefined();
    expect(usersService.findAll).toBeDefined();
    expect(usersService.findById).toBeDefined();
    expect(usersService.findByName).toBeDefined();
  });
});
