const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
  throw new Error(".env file was not found");
}

module.exports = {
  port: parseInt(process.env.PORT, 10) || 4000,
  api: {
    prefix: '/api'
  },
  jwt_secret: process.env.JWT_SECRET,
  database: {
    development: {
      db_host: process.env.DEV_DB_HOST,
      db_database: process.env.DEV_DB_DATABASE,
      db_user: process.env.DEV_DB_USERNAME,
      db_password: process.env.DEV_DB_PASSWORD,
      db_dialect: process.env.DEV_DB_DIALECT
    },
    production: {
      // db_host: process.env.RDS_HOSTNAME,
      // db_dabatase: process.env.RDS_DBNAME,
      // db_user: process.env.RDS_USERNAME,
      // db_password: process.env.RDS_PASSWORD,
      // db_port: process.env.RDS_PORT,
      // db_dialect: process.env.RDS_DIALECT
    }
  },
  gmail: {
    email: process.env.GMAIL_USER,
    password: process.env.GMAIL_PASSWORD
  },
  frontendBaseURL: process.env.FRONTEND_BASE_URL,
  aws: {
    bucket: process.env.AWS_BUCKET,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  }
};