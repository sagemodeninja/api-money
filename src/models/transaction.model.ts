import {Entity, model, property} from '@loopback/repository';

@model()
export class Transaction extends Entity {
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
    type: 'number',
    required: true,
    mysql: {
      columnName: 'AccountId',
      dataType: 'bigint',
    },
  })
  accountId: number;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'Date',
      dataType: 'date',
    },
  })
  date: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: {columnName: 'Description'},
  })
  description: string;

  @property({
    type: 'number',
    required: true,
    mysql: {columnName: 'TransactionType'},
  })
  transactionType: number;

  @property({
    type: 'number',
    precision: 18,
    scale: 2,
    mysql: {
      columnName: 'Amount',
      dataType: 'decimal',
    },
  })
  amount?: number;

  @property({
    type: 'number',
    precision: 18,
    scale: 2,
    mysql: {
      columnName: 'TransactionFee',
      dataType: 'decimal',
    },
  })
  transactionFee?: number;

  @property({
    type: 'number',
    precision: 18,
    scale: 2,
    mysql: {
      columnName: 'Total',
      dataType: 'decimal',
    },
  })
  total?: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'Posted',
      dataType: 'bit',
    },
  })
  posted: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'Status',
      dataType: 'bit',
    },
  })
  status: number;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
