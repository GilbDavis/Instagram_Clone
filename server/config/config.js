const config = require("./configuration");

module.exports = {
  "development": {
    "username": config.database.development.db_user,
    "password": config.database.development.db_password,
    "database": config.database.development.db_database,
    "host": config.database.development.db_host,
    "dialect": config.database.development.db_dialect
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}