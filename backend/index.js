const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const searchRoutes = require('./routes/search');
const playlistsRoutes = require('./routes/playlists');
const socialRoutes = require('./routes/social');
const profileRoutes = require('./routes/profile');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Use the routes
app.use('/api/auth', authRoutes)
app.use('/api/feed', feedRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/playlists', playlistsRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/profile', profileRoutes)

app.get('/', (req, res) => res.send('Hello World!'));

server = app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

module.exports = { app, server };