// DatabaseService.test.js

//Load test subject
const DatabaseService = require('../../../services/DatabaseService.js');

//Load dependencies
const mysql2 = require('mysql2/promise');

//Setup mocks
jest.mock('mysql2/promise');

const db = new DatabaseService({});

test('connect', async () => {
  mysql2.createConnection.mockReturnValue('connected');

  const result = await db.connect();

  expect(result).toBe('connected');

});

test('query', async () => {
  // mysql2.execute.mockReturnValue(['rows', 'fields']);
  const connMock = jest.fn();
  connMock.execute = jest.fn().mockReturnValue(['rows', 'fields']);
  connMock.end = jest.fn();

  mysql2.createConnection.mockReturnValue(connMock);

  const result = await db.query('querystring');

  expect(result).toBe('rows');

});
