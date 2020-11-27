// cardactivated.js

const AwsSnsNotificationService = require('../../services/AwsSnsNotificationService.js');
const CustomerRepo = require('../../repositories/CustomerRepository.js');
const DatabaseService = require('../../services/DatabaseService.js');
const config = require('../../services/config.js');
const moment = require('moment');

module.exports.cardactivated = async function(event, context) {
  'use strict';

  const db = new DatabaseService(config.DB_CONFIG);
  const customerRepo = new CustomerRepo(db);
  const snsService = new AwsSnsNotificationService(config.AWS_SNS_CONFIG);

  const activationDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const customersWithActiveCards = await customerRepo.getCustomersByCardActivationDate(activationDate);

  for (const customer of customersWithActiveCards) {
    console.log(await snsService.publish({
      message: customer,
      topic: process.env.TOPIC_NAME

    }));
  };

}
