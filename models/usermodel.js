const { session } = require('../config/db');
const bcrypt = require('bcrypt');

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await session.run(
    `CREATE (u:User {email: $email, password: $password}) RETURN u`,
    { email, password: hashedPassword }
  );

  return result.records[0].get('u').properties;
}

async function findUserByEmail(email) {
  const result = await session.run(
    `MATCH (u:User {email: $email}) RETURN u`,
    { email }
  );

  if (result.records.length > 0) {
    return result.records[0].get('u').properties;
  }

  return null;
}

module.exports = { createUser, findUserByEmail };
