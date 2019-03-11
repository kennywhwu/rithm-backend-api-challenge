const db = require("../db");

class User {
  static async findAll() {
    const result = await db.query(
      `SELECT user_id, user_name, user_age, user_gender, last_location, lat, long
        FROM users`
    );

    return result.rows;
  }
}

module.exports = User;
