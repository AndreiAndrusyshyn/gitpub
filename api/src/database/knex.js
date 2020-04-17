const knex = require('knex');

module.exports = app => {
  const knexConfig = JSON.parse(JSON.stringify(app.get('postgres')));
  knexConfig.connection.host =
    knexConfig.connection.host || process.env.DB_HOST;
  knexConfig.connection.port =
    knexConfig.connection.port || process.env.DB_PORT;
  knexConfig.connection.password = process.env.DB_PASSWORD;
  // console.log('knexConfig2=', knexConfig);
  const db = knex(knexConfig);

  app.set('knexClient', db);
};
