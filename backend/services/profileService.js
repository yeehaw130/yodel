const { db } = require('../config/firebaseConfig');

const getUserPlaylists = async (userId) => {
    console.log("Got to checkpoint alpha");
    const userRef = db.collection('users').doc(userId);
    console.log("The user ref is: ");
    console.log(userRef);
    const playlistsQuery = db.collection('playlists').where('createdBy', '==', userRef);
    const playlistsSnapshot = await playlistsQuery.get();
    console.log("The playlist query snapshot results in: ");
    console.log(playlistsSnapshot);
    const playlists = [];
    playlistsSnapshot.forEach((doc) => {
        playlists.push({ id: doc.id, ...doc.data() });
    });
    return playlists;
}

const getPlaylistSongs = async (playlistId) => {
    //console.log("Got to checkpoint");
    console.log("The playlist id is:  ");
    console.log(playlistId);
    const playlistRef = db.collection('playlists').doc(playlistId);
    console.log("The playlist ref is: ");
    console.log(playlistRef);
    const songsQuery = db.collection('playlistSongs').where('playlist', '==', playlistRef);
    const songsSnapshot = await songsQuery.get();
    console.log("The songs snapshot is: ");
    console.log(songsSnapshot);
    const songs = [];
    songsSnapshot.forEach((doc) => {
        //const songRef = db.collection('songs').doc(doc.song);
        //console.log("the songRef is: ");
        //console.log(songRef)
        //const songsQuery = db.collection('songs').where('', '==', playlistRef);
        //const songsSnapshot = await songsQuery.get();
        songs.push({ id: doc.id, ...doc.data() });
    });
    console.log("Songs array is: ");
    console.log(songs);
    final_songs = [];
    for (const song of songs) {
        const songsQuery = db.collection('songs').where('__name__', '==', song.song);
        const songsSnapshot = await songsQuery.get();
        console.log("Final songs snapshot is: ");
        console.log(songsSnapshot);
        songsSnapshot.forEach((doc) => {
            final_songs.push({ id: song.id, name: doc.data().name});
        })
    }
    console.log("Final songs array is: ");
    console.log(final_songs);
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