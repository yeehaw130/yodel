/* eslint-disable react/prop-types */
import { useState } from 'react';
import BulletSeparatedList from './BulletSeparatedList';
import './Playlist.css';
import { TitleText } from './CommonStyles';

const Playlist = ({ playlist }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(playlist.numLikes);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }

    return (
        <div className="playlist">
            <img
                src={playlist.cover}
                alt={playlist.title}
                onDoubleClick={handleLike}
                width="400px"
                height="400px"
            />
            <PlaylistInfo playlist={playlist} />
        </div>
    );
}

const PlaylistInfo = ({ playlist }) => {
    return (
        <div className="playlistInfo">
            <TitleText>{playlist.title}</TitleText>
            <span>{playlist.description}</span>
            <BulletSeparatedList
                list={[
                    // playlist.creator.profilePicture,
                    playlist.creator.name,
                    playlist.songs.length + ' songs',
                    playlist.duration,
                    playlist.numLikes + ' likes'
                ]}
            />
            <SongList songs={playlist.songs} />
        </div>
    );
}

const SongList = ({ songs }) => {
    return (
        <ul>
            {songs.slice(0, 4).map((song, i) => (
                <li key={i}>
                    <Song song={song} />
                </li>
            ))}
        </ul>
    );
}

const Song = ({ song }) => {
    return (
        <div className="song">
            <img
                src={song.cover}
                alt={song.title}
                width="55px"
                height="55px"
            />
            <div>
                <span>{song.title.substring(0, 12)}</span>
                <span style={{ color: "#ffffff70"}}>{song.artist.substring(0, 8)}</span>
            </div>
            <span>{song.album}</span>
            <span>{song.duration}</span>
        </div>
    );
}

export default Playlist;

