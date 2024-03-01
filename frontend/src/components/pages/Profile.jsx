import React from 'react';
import { BasicButton } from "../CommonStyles";
import { auth } from "../../firebase";
import axios from "axios";


const Profile = () => {
  const connectMusicService = () => {
    const userId = auth.currentUser.uid;
    const returnUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/connectService/" + userId;
    window.location.href = "https://app.musicapi.com/yodel?returnUrl=" + returnUrl;
  }
  const fetchPlaylists = async () => {
    try {
      const userId = auth.currentUser.uid;
      const playlists = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/playlists/fetch/" + userId).then(res => res.data);
      console.log(playlists);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch playlists: " + (error.response?.data || error.message));
    }
  }
  return (
    <div>
      <h1>Profile Page</h1>
      {/* Add your profile information and components here */}
      <BasicButton onClick={connectMusicService}>
        Connect to Music Service
      </BasicButton>
      <BasicButton onClick={fetchPlaylists}>
        Upload Playlists
      </BasicButton>
    </div>
  );
};

export default Profile;
