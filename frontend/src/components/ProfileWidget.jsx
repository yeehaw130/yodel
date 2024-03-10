/* eslint-disable react/prop-types */
import BulletSeparatedList from "./BulletSeparatedList";
import { TitleText, Widget } from "./CommonStyles";

const ProfileWidget = ({ user }) => {
    return (
        <Widget>
            <img
                src={user.profilePicture} alt={user.name}
                width="150px"
                height="150px" 
                style={{borderRadius: "50%"}}
            />
            <span>Profile</span>
            <TitleText>{user.name}</TitleText>
            <BulletSeparatedList list={[
                user.playlists.length + " playlists",
                user.friends.length + " friends",
            ]} />
        </Widget>
    );
};

export default ProfileWidget;