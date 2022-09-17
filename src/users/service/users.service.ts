import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Create a new user
   * @param name
   * @param password
   */
  @UseInterceptors(ClassSerializerInterceptor)
  async create(name: string, password: string): Promise<User> {
    const createdUser = new this.userModel({ name, password });
    return createdUser.save();
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Find user by id
   */
  async findById(id: string): Promise<User> {
    const user = this.userModel.findById(id).exec();
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  /**
   * Find user by name
   */
  async findByName(name: string): Promise<User> {
    const user = this.userModel.findOne({ name }).exec();
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  
  /**
   * Delete user by id
   */
  async deleteUserById(userId: string): Promise<void> {
    this.userModel.deleteMany({ _id: userId });
  }
}
