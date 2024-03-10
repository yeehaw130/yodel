import { useState } from 'react';
import Feed from '../Feed';
import FriendsWidget from '../FriendsWidget';
import UtilityWidget from '../UtilityWidget';
import LibraryWidget from '../LibraryWidget';
import ProfileWidget from '../ProfileWidget';
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  // align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

const WidgetColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 7fr;
  flex: 1;

`;

const Home = () => {
  const [user, setUser] = useState({
    name: "username",
    profilePicture: "../../img/pig.jpeg",
    playlists: [
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
    ],
    friends: [
      {
        name: "Friend 1",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 2",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 3",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 4",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 1",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 2",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 3",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 4",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 1",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 2",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 3",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 4",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 1",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 2",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 3",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 4",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 1",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 2",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 3",
        profilePicture: "../../img/pig.jpeg"
      },
      {
        name: "Friend 4",
        profilePicture: "../../img/pig.jpeg"
      }
    ]
  });

  return (
    <HomeContainer>
      <WidgetColumn>
        <UtilityWidget />
        <LibraryWidget playlists={user.playlists} />
      </WidgetColumn>
      <Feed playlists={user.playlists} />
      <WidgetColumn>
        <ProfileWidget user={user} />
        <FriendsWidget friends={user.friends} />
      </WidgetColumn>
    </HomeContainer>
  );
};

export default Home;
