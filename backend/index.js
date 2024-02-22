const express = require('express');
const bodyParser = require('body-parser');
const exampleRoutes = require('./routes/exampleRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the routes
app.use('/api', exampleRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
