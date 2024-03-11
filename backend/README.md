# Yodel Backend

Before running, make sure you create a `.env` file in the root. To the root, add your music API key as follows:
```
CLIENT_ID="..."
CLIENT_SECRET="..."
```

To start the server, run 
```
node index.js
```

## API Endpoints
```
POST /auth/signup
POST /auth/validateusername
POST /auth/verifytoken
GET /auth/connectservice/:userId

GET /feed/{userId}

GET /playlists/fetch/{userId}
POST /playlists/import/{playlistId}/{userId}
POST /playlists/{playlistId}/likes
DELETE /playlists/{playlistId}/likes

POST /social/follow
POST /social/unfolow
POST /social/acceptfollow
POST /social/rejectfollow
GET /social/followingStatus
GET /social/requests/{userId}
GET /social/followers/{userId}
GET /social/following/{userId}
POST /social/share
GET /social/activity/{userId}

GET /search
GET /search/song/{songId}
```

## Database Schema
```
users/{userId}
  - username: String                     // Unique username for the user.
  - email: String                        // User's email address.
  - createdAt: Timestamp                 // Account creation date and time.
  - isPublic: Boolean                    // Flag to indicate if the account is public or private.
  - profilePictureUrl: String (optional) // URL to the user's profile picture.
  - bio: String (optional)               // Short biography or description about the user.
  - followersCount: Number               // Number of users following this user (for quick access/display).
  - followingCount: Number               // Number of users this user is following (for quick access/display).
  - integrationUserUUID: String          // UUID used for MusicAPI integration.

playlists/{playlistId}
  - name: String
  - description: String
  - totalItems: Number
  - coverPhotoUrl: String (optional)
  - createdAt: Timestamp
  - createdBy: Reference (users/{userId}) // Reference to the user who created the playlist.
  - likesCount: Number                    // Number of likes the playlist has received (for quick access/display).

songs/{songId}
  - name: String
  - album: Reference (albums/{albumId})               // Reference to the album document.
  - artists: Array of References (artists/{artistId}) // References to artist documents.
  - duration: Number (ms)
  - imageUrl: String
  - isrc: String
  - previewUrl: String

playlistSongs/{playlistSongId}
  - playlist: Reference (playlists/{playlistId})
  - song: Reference (songs/{songId})
  - createdAt: Timestamp                          // Time when song was added to the playlist.

artists/{artistId}
  - name: String

albums/{albumId}
  - name: String
  - artists: Array of References (artists/{artistId}) // Albums can have multiple artists.
  - totalItems: Number

likes/{likeId}
  - playlist: Reference (playlists/{playlistId}) // Reference to the liked playlist.
  - user: Reference (users/{userId})             // Reference to the user who liked the playlist.
  - createdAt: Timestamp                         // When the like was added.

follows/{followId}
  - follower: String {userId}               // The user sending the follow request.
  - following: String {userId}              // The user receiving the follow request.
  - createdAt: Timestamp                    // When the follow request was made or the follow was established.
  - status: String                          // "active" for accepted follows, "pending" for follow requests awaiting approval.
``` 

