import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/model/user.model';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return await this.tasksService.findAll();
  }

  @Post()
  async createOneTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
    @Body('userId') userId: ObjectId,
  ) {
    const generatedId = await this.tasksService.create(
      title,
      description,
      status,
      userId,
    );
    return { id: generatedId };
  }

  @Get(':userId')
  async getOneTask(@Param('userId') userId: string) {
    const response = await this.tasksService.getOneTask(userId);
    return {
      response,
    };
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    return this.tasksService.updateTask(id, title, description, status);
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    await this.tasksService.deleteTask(taskId);
    return {
      response: 'sucessfully deleted',
    };
  }

  @Delete()
  async deleteAllTasks() {
    await this.tasksService.deleteAllTasks();
    return {
      response: 'sucessfully deleted',
    };
  }
}
