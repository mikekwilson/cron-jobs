// accountcreated1day.js

const CustomerRepo = require('../repositories/CustomerRepository.js');
const DatabaseService = require('../services/DatabaseService.js');
const config = require('../services/config.js');

module.exports.accountcreated1day = async function(event, context) {
  'use strict';

  const db = new DatabaseService(config.DB_CONFIG);
  const customerRepo = new CustomerRepo(db);

  const customers = customerRepo.getCustomerByAccountCreationDate();

}
