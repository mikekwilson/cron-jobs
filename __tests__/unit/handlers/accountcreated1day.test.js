// accountcreated1day.test.js

//Load test subject
const handler = require('../../../functions/accountcreated1day/handler.js');

//Load Dependencies
const CustomerRepo = require('../../../repositories/CustomerRepository.js');
const DatabaseService = require('../../../services/DatabaseService.js');
const AwsSnsNotificationService = require('../../../services/AwsSnsNotificationService.js');
const moment = require('moment');

//Setup Mocks
jest.mock('../../../services/DatabaseService.js');

const customers = [
  { 'fname':'Hello', 'surname':'world' },
  { 'fname':'foo', 'surname':'bar' }
];
const mockGetCustomers = jest.fn().mockReturnValue(customers);
jest.mock('../../../repositories/CustomerRepository.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCustomerByAccountCreationDate: mockGetCustomers

    };
  });
});

const mockPublish = jest.fn();
jest.mock('../../../services/AwsSnsNotificationService.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      publish: mockPublish

    };
  });
});

test('Test setup complete', () => {
  expect(handler).toBeDefined();
  expect(CustomerRepo).toBeDefined();
  expect(DatabaseService).toBeDefined();
  expect(AwsSnsNotificationService).toBeDefined();

});

describe('Handler ', () => {
  const OLD_ENV = process.env;
  let result;

  beforeAll(async () => {
    result = await handler.accountcreated1day( {}, {} );
    process.env.TOPIC_NAME = 'accountcreated-1day';

  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('sets up services', () => {
    expect(DatabaseService).toHaveBeenCalled();
    expect(CustomerRepo).toHaveBeenCalled();
    expect(AwsSnsNotificationService).toHaveBeenCalled();

  });

  test('gets result from repo', () => {
    const creationDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    expect(mockGetCustomers).toHaveBeenCalled();
    expect(mockGetCustomers).toHaveBeenCalledWith(creationDate);

  });

  test('send response', () => {
    expect(mockPublish).toHaveBeenCalledTimes(2);

  });

});
