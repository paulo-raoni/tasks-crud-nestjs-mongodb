import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.getAllUsers).toBeDefined();
    expect(controller.getUserById).toBeDefined();
    expect(controller.getUserByName).toBeDefined();
    expect(controller.deleteUserById).toBeDefined();
  });
});
