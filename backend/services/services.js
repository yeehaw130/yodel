const axios = require('axios');
require('dotenv').config();

// MusicAPI call
const invokeMusicAPI = async (url) => {
    const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Basic " + Buffer.from(secret).toString('base64')
    };

    const res = await axios.get("https://api.musicapi.com/api/" + url, { headers }).then(res => res.data);
    return res;
};

const getOriginalToken = async (userModelUUID) => {
    const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Basic " + Buffer.from(secret).toString('base64')
    };

    console.log("https://api.musicapi.com/public/integrations/user/" + userModelUUID);
    const res = await axios.get("https://api.musicapi.com/public/integrations/user/" + userModelUUID, { headers }).then(res => res.data.integrationUser.authData.accessToken);
    console.log(res);
    return res;
};

// Spotify API call
const invokeSpotifyAPI = async (url, userModelUUID) => {
    const token = await getOriginalToken(userModelUUID);
    console.log("token: " + token);

    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const res = await axios.get("https://api.spotify.com/v1/" + url, { headers }).then(res => res.data);
    return res

}

module.exports = {
    invokeMusicAPI,
    invokeSpotifyAPI
};