import {Entity, model, property} from '@loopback/repository';

@model()
export class Account extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 5
  })
  shortcode: string;

  @property({
    type: 'string',
    required: true,
    length: 80
  })
  title: string;

  @property({
    type: 'number'
  })
  walletId: number;

  @property({
    type: 'number'
  })
  categoryId: number;

  @property({
    type: 'string',
    length: 16
  })
  accountNumber: string;

  @property({
    type: 'string',
    length: 20
  })
  bankIcon: string;

  @property({
    type: 'number',
    required: true
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
