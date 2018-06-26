import { IsString, IsInt, IsEmail } from 'class-validator';

export class ProjectDto {

  @IsString() readonly name: string;

  @IsString() readonly description?: string;

  @IsString() readonly projectId: string;

  @IsString() readonly owner: string;

  @IsString() readonly organization: string;
}
