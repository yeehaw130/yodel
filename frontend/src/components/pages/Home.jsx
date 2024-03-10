import { useEffect, useState } from 'react';
import Feed from '../Feed';
import FriendsWidget from '../FriendsWidget';
import UtilityWidget from '../UtilityWidget';
import LibraryWidget from '../LibraryWidget';
import ProfileWidget from '../ProfileWidget';
import styled from "styled-components";
import axios from "axios";
import { auth} from "../../firebase";

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
    username: "username",
    profilePictureUrl: "../../img/pig.jpeg",
    playlists: [
      {
        createdBy: {
          username: "Creator 1",
          profilePictureUrl: "../../img/pig.jpeg"
        },
        coverPhotoUrl: "../../img/pig.jpeg",
        name: "Playlist 1",
        description: "lorem ipsum dolor sit amet playlist description here",
        likesCount: 10,
        duration: "30m 31s",
        songs: [
          {
            name: "Song 1",
            artists: ["Artist 1"],
            imageUrl: "../../img/pig.jpeg",
            album: "Album 1",
            duration: "3:00"
          },
        ]
      },
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
  const [userPlaylists, setPlaylists] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      // fetch user data
      const userId = auth.currentUser.uid;
      const userInfo = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/social/" + userId).then(res => res.data);

      const playlists = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/playlists/get/" + userId).then(res => res.data);
      setPlaylists(playlists);

      const feed = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/playlists/feed/" + userId).then(res => res.data);
      setFeed(feed);           
      
      setUser({...user, ...userInfo})
    }
    getUser();
  }, []);

  return (
    <HomeContainer>
      <WidgetColumn>
        <UtilityWidget />
        <LibraryWidget playlists={userPlaylists} />
      </WidgetColumn>
      <Feed playlists={feed} />
      <WidgetColumn>
        <ProfileWidget user={user} />
        <FriendsWidget friends={user.friends} />
      </WidgetColumn>
    </HomeContainer>
  );
};

export default Home;
