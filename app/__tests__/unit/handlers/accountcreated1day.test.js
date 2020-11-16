// accountcreated1day.test.js

//Load test subject
const handler = require('../../../handlers/accountcreated1day.js');

//Load Dependencies
const CustomerRepo = require('../../../repositories/CustomerRepository.js');
const DatabaseService = require('../../../services/DatabaseService.js');

//Setup Mocks
jest.mock('../../../services/DatabaseService.js');

const mockGetCustomers = jest.fn();
jest.mock('../../../repositories/CustomerRepository.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCustomerByAccountCreationDate: mockGetCustomers

    };
  });
});

test('Setup complete', () => {
  expect(handler).toBeDefined();
  expect(CustomerRepo).toBeDefined();

});

describe('Handler ', () => {

  beforeAll(() => {
    handler.accountcreated1day( {}, {} );

  });

  test('sets up services', () => {
    expect(DatabaseService).toHaveBeenCalled();
    expect(CustomerRepo).toHaveBeenCalled();

  });

  test('gets result from repo', () => {
    expect(mockGetCustomers).toHaveBeenCalled();

  });

  test('send response', () => {
    // expect(mockPublish).toHaveBeenCalled();

  });

});
