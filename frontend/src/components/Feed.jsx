import { useState, useEffect } from 'react';
import Playlist from './Playlist';
import { TitleText, DividedList, Widget } from './CommonStyles';

const Feed = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        //TODO: load feed from backend
        setPlaylists([
            {
                creator: {
                    name: "Creator 1",
                    profilePicture: "../../img/pig.jpeg"
                },
                cover: "../../img/pig.jpeg",
                title: "Playlist 1",
                description: "lorem ipsum dolor sit amet playlist description here",
                numLikes: 10,
                duration: "30m 31s",
                songs: [
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    },
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    }
                ]
            },
            {
                creator: {
                    name: "Creator 1",
                    profilePicture: "../../img/pig.jpeg"
                },
                cover: "../../img/pig.jpeg",
                title: "Playlist 1",
                description: "lorem ipsum dolor sit amet playlist description here",
                numLikes: 10,
                duration: "30m 31s",
                songs: [
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    },
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    }
                ]
            },
            {
                creator: {
                    name: "Creator 1",
                    profilePicture: "../../img/pig.jpeg"
                },
                cover: "../../img/pig.jpeg",
                title: "Playlist 1",
                description: "lorem ipsum dolor sit amet playlist description here",
                numLikes: 10,
                duration: "30m 31s",
                songs: [
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    },
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    }
                ]
            },
            {
                creator: {
                    name: "Creator 1",
                    profilePicture: "../../img/pig.jpeg"
                },
                cover: "../../img/pig.jpeg",
                title: "Playlist 1",
                description: "lorem ipsum dolor sit amet playlist description here",
                numLikes: 10,
                duration: "30m 31s",
                songs: [
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    },
                    {
                        title: "Song 1",
                        artist: "Artist 1",
                        cover: "../../img/pig.jpeg",
                        album: "Album 1",
                        duration: "3:00"
                    },
                    {
                        title: "Song 2",
                        artist: "Artist 2",
                        cover: "../../img/pig.jpeg",
                        album: "Album 2",
                        duration: "3:00"
                    }
                ]
            }
        ]);
    }, []);

    return (
        <Widget style={{ flex: 2}}>
            <TitleText>For you</TitleText>
            <DividedList>
                {playlists.map((playlist, i) => (
                    <li key={i}>
                        <Playlist
                            playlist={playlist}
                        />
                    </li>
                ))}
            </DividedList>
        </Widget>
    );
};

export default Feed;
