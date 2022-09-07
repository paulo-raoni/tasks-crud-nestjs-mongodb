import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../model/task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  /**
   * Create a new task
   * @param title
   * @param description
   * @param status
   */
  async create(title: string, description: string, status: string): Promise<Task> {
    const createTask = new this.taskModel({ title, description, status });
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
  async getOneTask(taskId: string) {
    const task = await this.findTask(taskId);
    return {
      id: task.id,
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
    const modifiedTask = await this.findTask(taskId);
    if (title) modifiedTask.title = title;
    if (description) modifiedTask.description = description;
    if (status) modifiedTask.status = status;
    modifiedTask.save();
  }

  /**
   * Delete task
   * @param taskId
   */
  async deleteTask(taskId: string) {
    const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
    if (!result) throw new NotFoundException('Could not find task');
  }

  private async findTask(id: string): Promise<Task> {
    let task: any;
    try {
      task = this.taskModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find task');
    }
    if (!task) throw new NotFoundException('Could not find task');
    return task;
  }
}
