import {Entity, model, property} from '@loopback/repository';

@model()
export class Account extends Entity {
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
    length: 5,
    mysql: {columnName: 'Shortcode'},
  })
  shortcode: string;

  @property({
    type: 'string',
    required: true,
    length: 80,
    mysql: {columnName: 'Title'},
  })
  title: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'CategoryId',
      dataType: 'bigint',
    },
  })
  categoryId?: number;

  @property({
    type: 'string',
    length: 16,
    mysql: {columnName: 'AccountNumber'},
  })
  accountNumber?: string;

  @property({
    type: 'string',
    length: 20,
    mysql: {columnName: 'BankIcon'},
  })
  bankIcon?: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'Status',
      dataType: 'tinyint',
    },
  })
  status: number;

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
