import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ValidStatus } from '../enum/validStatus';
import { Task } from '../model/task.model';
import { UsersService } from '../../users/service/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Create a new task
   * @param title
   * @param description
   * @param status
   * @param userId
   */
  async create(
    title: string,
    description: string,
    status: string,
    userId: ObjectId,
  ): Promise<Task> {
    try {
      const userExists = await this.usersService.findById(userId.toString());
      if (!userExists) {
        throw new BadRequestException('This user does not exist');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }

    const createTask = new this.taskModel({
      title,
      description,
      status,
      userId,
    });

    return createTask.save();
  }

  /**
   * Find all tasks
   */
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  /**
   * Get one task
   */
  async getOneTask(userId: string) {
    const task = await this.findTask(userId);
    return {
      title: task.title,
      description: task.description,
      status: task.status,
    };
  }

  /**
   * Update task
   * @param taskId
   * @param title
   * @param description
   * @param status
   */
  async updateTask(
    taskId: string,
    title: string,
    description: string,
    status: string,
  ) {
    const validStatusList = Object.keys(ValidStatus).map(
      (key) => ValidStatus[key],
    );
    if (validStatusList.indexOf(status) === -1) {
      throw new BadRequestException(
        'Incorrect value for status property',
        `status must be one of this list [${validStatusList.join(', ')}]`,
      );
    }

    const updateData = {
      title,
      description,
      status,
    };

    try {
      const taskFound = await this.taskModel
        .findOneAndUpdate({ _id: taskId }, updateData, { new: true })
        .exec();
      return taskFound;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Delete task
   * @param taskId
   */
  async deleteTask(taskId: string) {
    try {
      const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
      if (!result) throw new NotFoundException('Could not find task');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAllTasks() {
    try {
      await this.taskModel.remove({}).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async findTask(id: string): Promise<Task> {
    let task: any;
    try {
      task = await this.taskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find task');
    }
    if (!task) throw new NotFoundException('Could not find task');
    return task;
  }
}
