// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FetchInfo } from './fetchinfo.class';
// import createModel from '../../models/users.model';
import hooks from './fetchinfo.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'fetchinfo': FetchInfo & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: app.get('knexClient'),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/fetchinfo', new FetchInfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fetchinfo');

  service.hooks(hooks);
}
