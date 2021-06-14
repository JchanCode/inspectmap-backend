const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { createToken } = require('../helper/tokens')
const { BCRYPT_WORK_FACTOR } = require("../config");


class User {
  constructor(id, first_name, last_name, username,email) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.email = email;
  };

  static async register (first_name, last_name, username ,email, pw) {
    try {
      
      const hashedPw = await bcrypt.hash(pw, BCRYPT_WORK_FACTOR);
      const results = await db.query(
        `INSERT INTO users (first_name, last_name, username, email, password)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`, 
         [first_name, last_name, username, email, hashedPw]
      );
      return createToken(results.rows[0]);
    } catch (error) {
      console.error(error);
      return error;
    };
  };

  static async get (username) {
    try {
      const result = await db.query(
        `SELECT username, first_name, last_name, email
         FROM users
         WHERE username = $1`,
         [username]
      );
      const user = result.rows[0]
      if (!user) throw new ExpressError(`No user: ${username}`)

      return user;
    } catch (error) {
      console.error(error)
      return error
    }
  }

  static async login (username, pw) {
    try {
      console.log(username, pw)
      const result = await db.query(
        `SELECT first_name, last_name, username, email, password
         FROM users
         WHERE username = $1`,
         [username]
      );
      // if username found
      const user = result.rows[0]
      console.log("Inside user class login", result.rows)
      if (user) {
        if (await bcrypt.compare(pw, user.password)) {
          return createToken(user);
        };
      };
      // if no username found or pw didnt 
      throw new ExpressError ("Invalid username/password", 400);

    } catch (error) {
      console.error(error);
      return error;
    };
  }

  async remove() {
    await db.query(
      `DELETE FROM users
       WHERE id = $1`,
       [this.id]
    );
  };

  async save() {
    const results = await db.query (
      `UPDATE users
       SET first_name = $1, last_name = $2, email = $3,
       WHERE id = $4`,
       [this.first_name, this.last_name, this.email, this.id]
    );
  };
}

module.exports = User