import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
    mysql: {
      columnName: 'Id',
      dataType: 'bigint',
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {columnName: 'Firstname'},
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {columnName: 'Lastname'},
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
    length: 320,
    mysql: {columnName: 'Email'},
  })
  email: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'Status',
      dataType: 'bit',
    },
  })
  status: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
