const { db } = require('../config/firebaseConfig');

const getUserPlaylists = async (userId) => {
    const userRef = db.collection('users').doc(userId);
    const playlistsQuery = db.collection('playlists').where('createdBy', '==', userRef);
    const playlistsSnapshot = await playlistsQuery.get();
    const playlists = [];
    playlistsSnapshot.forEach((doc) => {
        playlists.push({ id: doc.id, ...doc.data() });
    });
    return playlists;
}

const getPlaylistSongs = async (playlistId) => {
    const playlistRef = db.collection('playlists').doc(playlistId);
    const songsQuery = db.collection('playlistSongs').where('playlist', '==', playlistRef);
    const songsSnapshot = await songsQuery.get();
    const songs = [];
    songsSnapshot.forEach((doc) => {
        songs.push({ id: doc.id, ...doc.data() });
    });
    final_songs = [];
    for (const song of songs) {
        const songsQuery = db.collection('songs').where('__name__', '==', song.song);
        const songsSnapshot = await songsQuery.get();
        songsSnapshot.forEach((doc) => {
            final_songs.push({ id: song.id, name: doc.data().name});
        })
    }
    return final_songs;
}

const getUserInfo = async (userId) => {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        throw new Error('User document does not exist');
    }
    const { username, bio, profilePictureUrl, isPublic } = userSnapshot.data();
    return { username, bio, profilePictureUrl, isPublic };
}


module.exports = {
    getUserPlaylists,
    getPlaylistSongs,
    getUserInfo
};