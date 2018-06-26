import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Project } from './project.entity';

import { ConfigService } from '../config';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ProjectService.name);
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}

  /**
   * It's a good practice to use Lifecycle Hooks for all the initialization stuff
   * and avoid putting anything directly in the constructor
   */
  async onModuleInit() {
    this.logger.log(`Initialization... some async stuff ${this.config.get('ENV')}`);
  }
  onModuleDestroy() {
    this.logger.log(`Cleanup...`);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    this.logger.warn(id);
    return await this.projectRepository.findOne(id);
  }

  async create(project: ProjectDto): Promise<Project> {
    const obj = this.projectRepository.create(project);
    return await this.projectRepository.save(obj);
  }

  async replace(id: string, project: ProjectDto): Promise<any> {
    // const obj = this.projectRepository.create(project);
    // return this.projectRepository.findOneAndReplace({ id }, obj);
    return this.projectRepository.update(id, project);
  }

  async update(id: string, project: Partial<ProjectDto>): Promise<any> {
    // const obj = this.projectRepository.create(project);
    // return this.projectRepository.findOneAndUpdate({ id }, obj);
    return this.projectRepository.update(id, project);
  }

  async delete(id: string): Promise<any> {
    // return this.projectRepository.findOneAndDelete({ id });
    const project = await this.projectRepository.findOne(id);
    return this.projectRepository.delete(project);
  }

}
