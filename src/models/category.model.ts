import {Entity, model, property} from '@loopback/repository';

@model()
export class Category extends Entity {
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
    length: 100,
    mysql: {columnName: 'Title'},
  })
  title: string;

  @property({
    type: 'string',
    required: true,
    length: 6,
    mysql: {columnName: 'Color'},
  })
  color: string;

  @property({
    type: 'number',
    required: true,
    mysql: {columnName: 'Order'},
  })
  order: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'Status',
      dataType: 'bit',
    },
  })
  status: number;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
