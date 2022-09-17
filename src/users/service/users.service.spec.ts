import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controller/users.controller';
import { UserSchema } from '../model/user.model';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  /**
   * This is broken. Need to be checked.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
