import React, { useState, useEffect } from 'react';
import Playlist from './Playlist';

const Feed = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // Fetch posts from the server or API
        // and update the state with the fetched data
    }, []);

    return (
        <div>
            <h1>Feed</h1>
            {playlists.map((playlist) => (
                <Playlist key={playlist.id} playlist={playlist} />
            ))}
        </div>
    );
};

export default Feed;
