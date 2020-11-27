// CustomerRepository.test.js

//Load test subject
const CustomerRepo = require('../../../repositories/CustomerRepository.js');

//Load dependencies
const DatabaseService = require('../../../services/DatabaseService.js');

//Setup mocks
jest.mock('../../../services/DatabaseService.js');

const db = new DatabaseService({});
const customerRepo = new CustomerRepo(db);

test('Setup complete', () => {
  expect(customerRepo).toBeDefined();

});

describe('getCustomerByAccountCreationDate', () => {
  test('DB is Queried with correct SQL', async () => {
    db.query.mockReturnValue('rows');
    const date = '01/01/2020';
    const query = `
      SELECT *
      FROM candidates
      WHERE creation_date = '${date}'
    `;
    const result = await customerRepo.getCustomerByAccountCreationDate(date);

    expect(db.query).toHaveBeenCalledWith(query);
    expect(result).toBe('rows');

  });

});

describe('getCustomersByCardActivationDate', () => {
  test('DB is Queried with correct SQL', async () => {
    db.query.mockReturnValue('rows');
    const date = '01/01/2020';
    const query = `
      SELECT *
      FROM candidates
      WHERE activation_date = '${date}'
    `;
    const result = await customerRepo.getCustomersByCardActivationDate(date);

    expect(db.query).toHaveBeenCalledWith(query);
    expect(result).toBe('rows');

  });

})
