import {
  Get,
  Post,
  Body,
  Controller,
  Param,
  Patch,
  Put,
  Delete, HttpStatus, HttpCode,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { ProjectDto } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Project> {
    return this.projectService.findOne(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() project: ProjectDto): Promise<Project> {
    return this.projectService.create(project);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async replace(@Param() params, @Body() project: ProjectDto): Promise<any> {
    await this.projectService.replace(params.id, project);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async patch(@Param() params, @Body() project: Partial<ProjectDto>): Promise<any> {
    await this.projectService.update(params.id, project);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params) {
    await this.projectService.delete(params.id);
  }
}
