import { useState, useEffect } from 'react';
import Playlist from './Playlist';
import styled from 'styled-components';
import { TitleText } from './CommonStyles';

const DividedList = styled.ul` 
    list-style-type: none;
    & > li {
        padding-bottom: 30px;
        padding-top: 30px;
    }
    & > li:not(:last-child) {
        border-bottom: 1px solid #e1e1e1; 
    }
`;

const FeedContainer = styled.div`
    text-align: start;
    background-color: #121212;
    padding: 65px;
    padding-top: 30px;
    border-radius: 12px;
`;

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
        <FeedContainer>
            <TitleText>For you</TitleText>
            <DividedList>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <Playlist
                            playlist={playlist}
                        />
                    </li>
                ))}
            </DividedList>

        </FeedContainer>
    );
};

export default Feed;
