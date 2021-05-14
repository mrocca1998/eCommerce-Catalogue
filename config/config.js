module.exports = {
  "development": {
    "username": "express-mvp-dbuser",
    "password": 'test',
    "database": "express-mvp-db",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
