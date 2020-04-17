import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
const feathersErrors = require('@feathersjs/errors');

import logger from '../../logger';
export class Users extends Service {
  private app: Application;
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'users'
    });
    this.app = app;
  }

  async get(id:any , params:any) {
    console.log(id.email)
    const knex = this.app.get('knexClient');
    return knex('users')
      .select()
      .where({ email: id.email })
      .then((resp: any) => {
        return resp[0];
      });
  }
}
