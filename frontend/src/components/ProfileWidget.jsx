/* eslint-disable react/prop-types */
import BulletSeparatedList from "./BulletSeparatedList";
import { TitleText, Widget } from "./CommonStyles";
import styled from "styled-components";

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 35px;
`;

const ProfileWidget = ({ user }) => {
    return (
        <Widget styles={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <img
                src={user.profilePictureUrl} alt={user.name}
                width="150px"
                height="150px"
                style={{ borderRadius: "50%" }}
            />
            <ProfileInfo>
                <span>Profile</span>
                <TitleText>{user.name}</TitleText>
                <BulletSeparatedList list={[
                    user.playlists.length + " playlists",
                    user.friends.length + " friends",
                ]} />
            </ProfileInfo>
        </Widget>
    );
};

export default ProfileWidget;