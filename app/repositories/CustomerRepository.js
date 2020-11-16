// CustomerRepository.js

class CustomerRepository {
  constructor(db) {
    this._db = db;

  }

  /**
   * Fetch all customer records with accounts created on the given date
   *
   * @param {string} date
   *
   * @return {array}
   */
  async getCustomerByAccountCreationDate(date) {
    const query = `
      SELECT *
      FROM candidates AS c
      WHERE creation_date = ${date}
    `;

    return this._db.query(query);

  }//end getCustomerByAccountCreationDate()

}//end class

module.exports = CustomerRepository;
