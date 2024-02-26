import {useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios';

const Spotify = () => {

    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const CLIENT_ID = "67aed121b3ab43eb876a1a1b1a3f44ef"
    const REDIRECT_URI = "http://localhost:5174/"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("") 
    const [artists, setArtists] = useState([])

    useEffect( () => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if(!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            
            window.location.hash = ""
            window.localStorage.setItem("token", token)

        }

        setToken(token)
    })

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })


        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                <img
                    src={artist.images.length ? artist.images[0].url : 'placeholder-url'}
                    alt={`Image for ${artist.name}`}
                    style={{ width: '100%' }}
                />
                <div>{artist.name}</div>
            </div>
        ));
    }


    return (
        <div className="App">
            <h1 className="App-header">
                <h2>Spotify React</h2>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                    to spotify</a>
                : <button onClick={logout}>Logout</button>

                {token ?
                    <form onSubmit={searchArtists}>
                        <input type="text" onChange={(e => setSearchKey(e.target.value))}/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <h2> Please login </h2>
                    
                }

                {renderArtists()}
            </h1>
        </div>



    );

}

export default Spotify;