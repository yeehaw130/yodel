import React from 'react';
import { BasicButton } from "../CommonStyles";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [fetching, setFetching] = useState(false);
  const [uploadedPlaylists, setUploadedPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlistSongsMap, setPlaylistSongsMap] = useState(new Map());
  const [openStates, setOpenStates] = useState({});
  const [fetchedFlags, setFetchedFlags] = useState({});

  const fetchUploadedPlaylists = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      const q = query(collection(db, "playlists"), where("createdBy", "==", userRef));
      const querySnapshot = await getDocs(q);
      const fetchedPlaylists = [];
      querySnapshot.forEach((doc) => {
        fetchedPlaylists.push({ id: doc.id, ...doc.data() });
      });
      setUploadedPlaylists(fetchedPlaylists);
    }
  };

  const fetchSongsForPlaylist = async (playlistId) => {
    if (auth.currentUser) {
      const playlistRef = doc(db, "playlists", playlistId);

      // Check if songs for this playlist have already been fetched
      if (fetchedFlags[playlistId]) {
        return;
      }

      const q = query(collection(db, "playlistSongs"), where("playlist", "==", playlistRef));
      const querySnapshot = await getDocs(q);
      const fetchedSongs = [];

      for (const docu of querySnapshot.docs) {
        const playlistSongData = docu.data();
        const songId = playlistSongData.song.id;

        // Fetch additional song details from the "songs" collection if not already fetched
        if (!fetchedFlags[songId]) {
          const songDoc = await getDoc( doc(db, "songs", songId));

          if (songDoc.exists()) {
            const songData = songDoc.data();
            fetchedSongs.push({
              id: songDoc.id,
              name: songData.name,
              // Include other fields as needed
            });
          }

          // Set the flag indicating songs for this songId have been fetched
          setFetchedFlags((prevFlags) => ({ ...prevFlags, [songId]: true }));
        }
      }

      // Set the flag indicating songs for this playlistId have been fetched
      setFetchedFlags((prevFlags) => ({ ...prevFlags, [playlistId]: true }));

      setPlaylistSongsMap((prevMap) => new Map(prevMap).set(playlistId, fetchedSongs));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch uploaded playlists
      await fetchUploadedPlaylists();
    };
  
    fetchData();
  }, []); // Only fetch playlists when the component mounts
  
  useEffect(() => {
    // When uploadedPlaylists changes, check if it's not empty
    if (uploadedPlaylists.length > 0) {
  
      // Fetch songs for each playlist if not already fetched
      for (const playlist of uploadedPlaylists) {
        const fetchData = async () => {
          // Fetch uploaded playlists
          await fetchSongsForPlaylist(playlist.id);
        };
        fetchData();
      }
    }
  }, [uploadedPlaylists]);


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

  const toggle = (playlistId) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [playlistId]: !prevStates[playlistId],

    })
    );
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
        <ul className="uploaded-playlists">
          {uploadedPlaylists.map((playlist) => (
            <li key={playlist.id} className="playlist-item">
              <span className="playlist-name">{playlist.name}</span>
              <span className="playlist-detail">{playlist.totalItems} songs</span>
              <span className="playlist-detail">{(playlist.likesCount || 0) + ' likes'}</span>
              <span className="playlist-description">{playlist.description}</span>
              <button onClick={() => toggle(playlist.id)}>View Songs</button>
              {openStates[playlist.id] && (
                <div>
                <h3>Songs for {playlist.name}</h3>
                <ul>
                  {/* Map over the songs for the current playlist */}
                  {playlistSongsMap.get(playlist.id)?.map((song) => (
                    <li key={song.id}>{song.name}</li>
                    // You can display other song information as needed
                  ))}
                </ul>
                </div>
              )}

            </li>
          ))}
        </ul>
        </div>
    )}
    </div>
  );  
};

export default Profile;