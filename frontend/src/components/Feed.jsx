/* eslint-disable react/prop-types */
import Playlist from './Playlist';
import { TitleText, DividedList, Widget } from './CommonStyles';

const Feed = ({playlists}) => {
    return (
        <Widget style={{ 
            flex: 2,
            overflow: "auto",
            height: "93vh",
         }}>
            <TitleText>For you</TitleText>
            <DividedList>
                {playlists.map((playlist, i) => (
                    <li key={i}>
                        <Playlist
                            playlist={playlist}
                        />
                    </li>
                ))}
            </DividedList>
        </Widget>
    );
};

export default Feed;
