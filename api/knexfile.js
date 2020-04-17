require('dotenv').config();
const config = require('config');

function getKnexSettings() {
  const knexConfig = { ...config.postgres };
  console.log('before knexConfig=', knexConfig);
  knexConfig.connection.host = 'db'
    // knexConfig.connection.host || process.env.DB_HOST;
  knexConfig.connection.port = '5436'
    // knexConfig.connection.port || process.env.DB_PORT;
  knexConfig.connection.password = process.env.DB_PASSWORD;
  console.log('after knexConfig=', knexConfig);
  return knexConfig;
}

function classof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

function formatString(src, ...args) {
  let str = src;

  args.forEach((element, index) => {
    str = str.replace(`{${index}}`, element);
  });

  return str;
}

module.exports = classof();
module.exports = formatString();
module.exports = getKnexSettings();

module.exports.onUpdateTrigger = table => {
  return `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `;
};
