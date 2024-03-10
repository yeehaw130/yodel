const axios = require('axios');
require('dotenv').config();

// MusicAPI call
const invokeMusicAPI = async (url) => {
    const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Basic " + Buffer.from(secret).toString('base64')
    };
    const res = await axios.get(url, { headers }).then(res => res.data);
    return res;
};

module.exports = {
    invokeMusicAPI,
};