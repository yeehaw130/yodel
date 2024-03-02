import React from 'react';
import { BasicButton } from "../CommonStyles";
import { auth } from "../../firebase";
import axios from "axios";
import { useState } from 'react';
import './Profile.css'

require('module-alias/register');
const { db } = require('@backend/config/firebaseConfig');

const Profile = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [fetching, setFetching] = useState(false);
  const [uploadedPlaylistDetails, setUploadedPlaylistDetails] = useState(null);

  useEffect(() => {
    const fetchUploadedPlaylistDetails = async () => {
      const docRef = doc(db, "playlists", "example");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUploadedPlaylistDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchUploadedPlaylistDetails();
  }, []);

  const connectMusicService = () => {
    const userId = auth.currentUser.uid;
    const returnUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/connectService/" + userId;
    window.location.href = "https://app.musicapi.com/yodel?returnUrl=" + returnUrl;
  }

  const fetchPlaylists = async () => {
    setFetching(true);
    try {
      const userId = auth.currentUser.uid;
      const playlistResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/playlists/fetch/" + userId).then(res => res.data);
      setPlaylists(playlistResponse);
      setFetching(false);
    } catch (error) {
      throw new Error("Failed to fetch playlists: " + (error.response?.data || error.message));
      setFetching(false);
    }
  }
  
  const importPlaylist = async () => {
    if (!selectedPlaylist) return;
    try {
      const userId = auth.currentUser.uid;
      const playlist = playlists.find(p => p.id === selectedPlaylist);
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/playlists/import/' + userId, { playlist });
      setUploadedPlaylists(prev => [...prev, playlist]);
    } catch (error) {
      throw new Error("Failed to import playlist: " + (error.response?.data || error.message));
    }
  };


  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="controls-row">
        <BasicButton onClick={connectMusicService}>
          Connect to Music Service
        </BasicButton>
        <BasicButton onClick={fetchPlaylists} disabled={fetching}>
          {fetching ? 'Fetching Playlists...' : 'Upload Playlists'}
        </BasicButton>
        {playlists.length > 0 && (
          <>
            <select value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)} className="playlist-dropdown">
              <option value="">Select a playlist</option>
              {playlists.map(playlist => (
                <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
              ))}
            </select>
            <BasicButton onClick={importPlaylist} disabled={!selectedPlaylist}>
              Upload Selected Playlist
            </BasicButton>
          </>
        )}
      </div>
      {uploadedPlaylists.length > 0 && (
      <div>
        <h2>Uploaded Playlists</h2>
        <ul>
          {uploadedPlaylists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      </div>
    )}
    </div>
  );  
};

export default Profile;