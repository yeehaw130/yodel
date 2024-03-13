import { BasicButton } from "../CommonStyles";
import { useUserAuth } from "../../auth/Auth";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadedPlaylists, setUploadedPlaylists] = useState([]);
  const [userInformation, setUserInformation] = useState({});
  const [followingStatus, setFollowingStatus] = useState("none");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playlistSongsMap, setPlaylistSongsMap] = useState(new Map());
  const [openStates, setOpenStates] = useState({});
  const [fetchedFlags, setFetchedFlags] = useState({});
  const [isMe, setIsMe] = useState(false);
  const { userId } = useParams();
  const { user } = useUserAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const whoIsThis = async () => {
      if (userId === user.uid) {
        setIsMe(true);
        return;
      }
      const reqId = user.uid;
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/social/followingStatus/",
          { params: { userId: reqId, targetUserId: userId } }
        ).then(res => res.data);
        setFollowingStatus(response.data);
      }
      catch (error) {
        throw new Error("Failed to check if following: " + (error.response?.data || error.message));
      }
    };

    const fetchUploadedPlaylists = async () => {
      if (isMe && followingStatus !== "active" && !userInformation.isPublic) {
        console.log("not fetching playlists")
        return;
      }
      try {
        const playlistResponse = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/profile/playlists/" + userId,
        ).then(res => res.data);
        setUploadedPlaylists(playlistResponse);
      }
      catch (error) {
        throw new Error("Failed to fetch playlists: " + (error.response?.data || error.message));
      }
    };

    const fetchUserInformation = async () => {
      try {
        const userResponse = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/profile/" + userId,
        ).then(res => res.data);
        setUserInformation(userResponse);
      }
      catch (error) {
        throw new Error("Failed to fetch user information: " + (error.response?.data || error.message));
      }
    };

    const fetchSocialCounts = async () => {
      try {
        const followersResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/social/followers/${userId}`).then(res => res.data);
        setFollowersCount(followersResponse.length);

        const followingResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/social/following/${userId}`).then(res => res.data);
        setFollowingCount(followingResponse.length);
      } catch (error) {
        throw new Error("Failed to fetch social counts:  " + (error.response?.data || error.message));
      }
    };


    const fetchSocialLists = async () => {
      try {
        const followersListResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/social/followers/list/${userId}`).then(res => res.data);
        setFollowersList(followersListResponse);
        console.log("followerlist ", followersListResponse);

        const followingListResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/social/following/list/${userId}`).then(res => res.data);
        setFollowingList(followingListResponse);
        console.log("followinglist ", followingListResponse);
      } catch (error) {
        throw new Error("Failed to fetch social lists:  " + (error.response?.data || error.message));
      }
    };


    const fetchPlaylistSongs = async () => {
      if (isMe && followingStatus !== "active" && !userInformation.isPublic) {
        console.log("not fetching playlist songs");
        return;
      }
      try {
        const playlistResponse = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/profile/playlists/" + userId,
        ).then(res => res.data);
        setUploadedPlaylists(playlistResponse);
        await Promise.all(playlistResponse.map(async (playlist) => {
          const songsResponse = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "/api/profile/playlists/songs/" + playlist.id,
            { params: { playlistId: playlist.id } }
          ).then(res => res.data);
          setPlaylistSongsMap((prevMap) => new Map(prevMap).set(playlist.id, songsResponse));
        }));
      } catch (error) {
        throw new Error("Failed to fetch playlist songs: " + (error.response?.data || error.message));
      }
    };

    const runInitialFetches = async () => {
      await fetchUserInformation();
      await whoIsThis();
      await fetchUploadedPlaylists();
      await fetchSocialCounts();
      await fetchSocialLists();
      await fetchPlaylistSongs();
      setLoading(false);
    }

    runInitialFetches();
  }, []);

  const connectMusicService = () => {
    const userId = user.uid;
    const returnUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/connectService/" + userId;
    window.location.href = "https://app.musicapi.com/yodel?returnUrl=" + returnUrl;
  }

  const fetchPlaylists = async () => {
    setFetching(true);
    try {
      const userId = user.uid;
      const playlistResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/playlists/fetch/" + userId).then(res => res.data);
      setPlaylists(playlistResponse);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      throw new Error("Failed to fetch playlists: " + (error.response?.data || error.message));
    }
  }

  const importPlaylist = async () => {
    if (!selectedPlaylist) return;
    try {
      const userId = user.uid;
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

  const socialDiv = () => {
    return (
      <div className="social-div">
        <div className="dropdown-container">
          <button onClick={() => setShowFollowers(!showFollowers)}>
            {followersCount || 0} Followers
          </button>
          {showFollowers && (
            <ul className="dropdown">
              {followersList.map((follower) => (
                <li key={follower.id} className="dropdown-item">
                  <li>{follower.username}</li>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="dropdown-container">
          <button onClick={() => setShowFollowing(!showFollowing)}>
            {followingCount || 0} Following
          </button>
          {showFollowing && (
            <ul className="dropdown">
              {followingList.map((following) => (
                <li key={following.id} className="dropdown-item">
                  <li>{following.username}</li>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
    };

  const playlistsDiv = () => {
    if (isMe || followingStatus === "active" || userInformation.isPublic) {
      return (
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
      )
    }
    else {
      return <h2>User profile is private</h2>
    }
  };

  const followUser = async () => {
    const reqId = user.uid;
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/social/follow/",
        { userId: reqId, targetUserId: userId }
      );
      if (userInformation.isPublic) {
        setFollowingStatus("active");
      }
      else {
        setFollowingStatus("pending");
      }
    }
    catch (error) {
      throw new Error("Failed to follow user: " + (error.response?.data || error.message));
    }
  }

  const unfollowUser = async () => {
    const reqId = user.uid;
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/social/unfollow/",
        { userId: reqId, targetUserId: userId }
      );
      setFollowingStatus("none");
    }
    catch (error) {
      throw new Error("Failed to unfollow user: " + (error.response?.data || error.message));
    }
  }

  const followOrUnfollowOrEditButton = () => {
    if (isMe) {
      // return (
      //   <BasicButton onClick={() => window.location.href = "/editprofile"}>Edit Profile</BasicButton>
      // );
      return null;
    }
    else if (followingStatus === "active") {
      return (
        <BasicButton onClick={unfollowUser}>Unfollow</BasicButton>
      );
    }
    else if (followingStatus === "pending") {
      return (
        <BasicButton onClick={unfollowUser}>Requested</BasicButton>
      );
    }
    else {
      return (
        <BasicButton onClick={followUser}>Follow</BasicButton>
      );
    }
  }

  const controlsRow = (
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
  )

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="profile-container">
      <div className="user-info">
          <img
            src={userInformation.profilePictureUrl ? userInformation.profilePictureUrl : "../../img/pig.jpeg"}
            alt="Profile Picture"
            width="150px"
            height="150px"
            style={{ borderRadius: "50%" }}
            onClick={() => navigate(`/`)}
            className="selectable"
          />
        <div className="profile-details">
          <h2>{userInformation.username}</h2>
          {socialDiv()}
          {followOrUnfollowOrEditButton()}
        </div>
      </div>
      {isMe && controlsRow}
      {playlistsDiv()}
    </div>
  );
};

export default Profile;