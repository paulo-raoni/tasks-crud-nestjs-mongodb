import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.findAll();
  }

  @Post()
  async createOneTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string
  ) {
    const generatedId = await this.tasksService.create(title, description, status);
    return { id: generatedId };
  }

  @Get(':id')
  getOneTask(@Param('id') taskId: string) {
    return this.tasksService.getOneTask(taskId);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    this.tasksService.updateTask(id, title, description, status);
    return {
      response: "sucessfully updated"
    };
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    this.tasksService.deleteTask(taskId);
    return {
      response: "sucessfully deleted"
    };
  }

}
