
import React, { useState } from 'react';

const Playlist = (playlist) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(playlist.likeCount);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }

    return (
        <div>
            <h3>{playlist.title}</h3>
            <p>{playlist.description}</p>
            <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
            <p>{likeCount} likes</p>
        </div>
    );
}

export default Playlist;

