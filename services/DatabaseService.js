// DatabaseService.js
const db = require('mysql2/promise');

class DatabaseService {
  constructor(config) {
    this.config = config;

  }

  async connect() {
    return await db.createConnection(this.config);

  }

  /**
   * Runs the provided query
   *
   * @param {string} SQL query string
   *
   * @return {array} Rows returned by query
   */
  async query(querystring) {
    const conn = await this.connect();
    const result = await conn.execute(querystring);
    await conn.end();

    return result[0];

  }

}

module.exports = DatabaseService;
