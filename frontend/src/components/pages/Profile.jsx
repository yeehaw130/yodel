import React from 'react';
import { BasicButton } from "../CommonStyles";
import { auth } from "../../firebase";
import axios from "axios";
import { useState } from 'react';


const Profile = () => {
  const [playlists, setPlaylists] = useState([]);
  const connectMusicService = () => {
    const userId = auth.currentUser.uid;
    const returnUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/connectService/" + userId;
    window.location.href = "https://app.musicapi.com/yodel?returnUrl=" + returnUrl;
  }
  const fetchPlaylists = async () => {
    try {
      const userId = auth.currentUser.uid;
      const playlistResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/playlists/fetch/" + userId).then(res => res.data);
      setPlaylists(playlistResponse);
    } catch (error) {
      throw new Error("Failed to fetch playlists: " + (error.response?.data || error.message));
    }
  }

  const importPlaylist = async (playlist) => {
    try {
      const userId = auth.currentUser.uid;
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/playlists/import/' + userId, { playlist });
    } catch (error) {
      throw new Error("Failed to import playlist: " + (error.response?.data || error.message));
    }
  };

  
  return (
    <div>
      <h1>Profile Page</h1>
      {/* Add your profile information and components here */}
      <BasicButton onClick={connectMusicService}>
        Connect to Music Service
      </BasicButton>
      <BasicButton onClick={fetchPlaylists}>
        Upload Playlist
      </BasicButton>
      {playlists.map(playlist => {
        return (
          <li key={playlist.id}>
            {playlist.name}
            <BasicButton onClick={() => importPlaylist(playlist)}>
              Upload
            </BasicButton>
          </li>
        )
      })}

    </div>
  );
};

export default Profile;
