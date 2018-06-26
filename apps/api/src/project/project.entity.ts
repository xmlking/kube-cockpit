import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Project {

  @ObjectIdColumn() id: ObjectID;

  @Column() name: string;

  @Column() description: string;

  @Column() projectId: string;

  @Column() owner: string;

  @Column() organization: string;
}
