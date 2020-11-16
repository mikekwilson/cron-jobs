// config.js

const config = {
  DB_CONFIG: {
    host:     process.env.CUSTOMER_DB_HOST,
    port:     process.env.CUSTOMER_DB_PORT,
    user:     process.env.CUSTOMER_DB_USER,
    password: process.env.CUSTOMER_DB_PASS,
    database: process.env.CUSTOMER_DB_NAME
  }

};

module.exports = config;
