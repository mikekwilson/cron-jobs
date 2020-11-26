// accountcreated1day.js

const AwsSnsNotificationService = require('../../services/AwsSnsNotificationService.js');
const CustomerRepo = require('../../repositories/CustomerRepository.js');
const DatabaseService = require('../../services/DatabaseService.js');
const config = require('../../services/config.js');
const moment = require('moment');

module.exports.accountcreated1day = async function(event, context) {
  'use strict';

  const db = new DatabaseService(config.DB_CONFIG);
  const customerRepo = new CustomerRepo(db);
  const snsService = new AwsSnsNotificationService(config.AWS_SNS_CONFIG);

  const creationDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const customers = await customerRepo.getCustomerByAccountCreationDate(creationDate);

  // customers.forEach(customer => {
  for (const customer of customers) {
    console.log(await snsService.publish({
      message: customer,
      topic: process.env.TOPIC_NAME
    }));
  }
  // })

}
