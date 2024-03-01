import React from 'react';
import { BasicButton } from "../CommonStyles";
import { auth } from "../../firebase";


const Profile = () => {
  const connectMusicService = () => {
    const userId = auth.currentUser.uid;
    const returnUrl = import.meta.env.VITE_BACKEND_URL + "/api/musicapi/connectService/" + userId;
    window.location.href = "https://app.musicapi.com/yodel?returnUrl=" + returnUrl;
  }
  return (
    <div>
      <h1>Profile Page</h1>
      {/* Add your profile information and components here */}
      <BasicButton onClick={connectMusicService}>
        Connect to Music Service
      </BasicButton>
    </div>
  );
};

export default Profile;
