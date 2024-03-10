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
  grid-template-rows: 1fr 6fr;
  flex: 1;
`;

const Home = () => {
  const [user, setUser] = useState({
    name: "username",
    profilePicture: "../../img/pig.jpeg",
    playlists: [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
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
      }
    ]
  });

  return (
    <HomeContainer>
      <WidgetColumn>
        <UtilityWidget />
        <LibraryWidget />
      </WidgetColumn>
      <Feed />
      <WidgetColumn>
        <ProfileWidget user={user} />
        <FriendsWidget friends={user.friends} />
      </WidgetColumn>
    </HomeContainer>
  );
};

export default Home;
