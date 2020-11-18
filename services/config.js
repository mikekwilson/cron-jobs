// config.js

const config = {
  DB_CONFIG: {
    host:     process.env.CUSTOMER_DB_HOST,
    port:     process.env.CUSTOMER_DB_PORT,
    user:     process.env.CUSTOMER_DB_USER,
    password: process.env.CUSTOMER_DB_PASS,
    database: process.env.CUSTOMER_DB_NAME
  },

  AWS_SNS_CONFIG: {
    apiVersion: '2010-03-31',
    endpoint: process.env.SNS_ENDPOINT
  }

};

module.exports = config;
