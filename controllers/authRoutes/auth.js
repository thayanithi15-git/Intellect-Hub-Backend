const db = require('../../config/db');

const getLogin = async (req, res) => {
  try {
    res.json({ message: 'Login route working' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error testing login route');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM account WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('DB error');
  }
};

module.exports = { getLogin, login };
