// config.js

const config = {
  DB_CONFIG: {
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },

  AWS_SNS_CONFIG: {
    apiVersion: '2010-03-31',
    endpoint: process.env.SNS_ENDPOINT
  }

};

module.exports = config;
