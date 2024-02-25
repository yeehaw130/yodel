const express = require('express');
const bodyParser = require('body-parser');
const exampleRoutes = require('./routes/exampleRoutes');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Use the routes
app.use('/api', exampleRoutes);
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
