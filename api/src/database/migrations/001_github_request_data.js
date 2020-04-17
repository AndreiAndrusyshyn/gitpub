const { tables } = require('../info.js');

exports.up = knex => {
  return knex.raw(`
    CREATE TABLE ${tables.GITHUB_REQUEST}
    (
      id                BIGSERIAL     NOT NULL PRIMARY KEY,
      "userId"              integer      NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      "projectOwner"         text       NULL,
      "projectName"          text       NULL ,
      "projectUrl"           text           NULL,
      "countStars"           text          NULL,
      "countForks"           text           NULL,
      "countIssues"           text          NULL,
      "createdAt"       timestamptz   NULL
    );
  `);
};

exports.down = knex => {
  return knex.schema.dropTableIfExists(tables.GITHUB_REQUEST);
};
