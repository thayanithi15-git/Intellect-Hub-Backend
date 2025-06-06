const express = require('express');
const dotenv = require('dotenv');
const BackendRoutes = require('./routes/routes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', BackendRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Connected to backend' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});