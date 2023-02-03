import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Account} from '../models';
import {AccountRepository} from '../repositories';

export class AccountController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @authenticate({strategy: 'auth0-jwt'})
  @post('/accounts')
  @response(200, {
    description: 'Account model instance',
    content: {'application/json': {schema: getModelSchemaRef(Account)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccount',
            exclude: ['id'],
          }),
        },
      },
    })
    account: Omit<Account, 'id'>,
  ): Promise<Account> {
    return this.accountRepository.create(account);
  }

  @authenticate({strategy: 'auth0-jwt'})
  @get('/accounts/count')
  @response(200, {
    description: 'Account model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Account) where?: Where<Account>): Promise<Count> {
    return this.accountRepository.count(where);
  }

  @authenticate({strategy: 'auth0-jwt'})
  @get('/accounts')
  @response(200, {
    description: 'Array of Account model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Account, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Account) filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.accountRepository.find(filter);
  }

  @authenticate({strategy: 'auth0-jwt'})
  @patch('/accounts')
  @response(200, {
    description: 'Account PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.updateAll(account, where);
  }

  @authenticate({strategy: 'auth0-jwt'})
  @get('/accounts/{id}')
  @response(200, {
    description: 'Account model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Account, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Account, {exclude: 'where'})
    filter?: FilterExcludingWhere<Account>,
  ): Promise<Account> {
    return this.accountRepository.findById(id, filter);
  }

  @authenticate({strategy: 'auth0-jwt'})
  @patch('/accounts/{id}')
  @response(204, {
    description: 'Account PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
  ): Promise<void> {
    await this.accountRepository.updateById(id, account);
  }

  @authenticate({strategy: 'auth0-jwt'})
  @put('/accounts/{id}')
  @response(204, {
    description: 'Account PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() account: Account,
  ): Promise<void> {
    await this.accountRepository.replaceById(id, account);
  }

  @authenticate({strategy: 'auth0-jwt'})
  @del('/accounts/{id}')
  @response(204, {
    description: 'Account DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.accountRepository.deleteById(id);
  }
}
