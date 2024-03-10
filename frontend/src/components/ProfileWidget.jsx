/* eslint-disable react/prop-types */
import BulletSeparatedList from "./BulletSeparatedList";
import { TitleText, Widget } from "./CommonStyles";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from "../auth/Auth";

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 35px;
`;

const ProfileWidget = ({ user }) => {
    const navigate = useNavigate();
    const { user: userAuth } = useUserAuth();

    return (
        <Widget className="selectable" onClick={() => navigate(`/profile/${userAuth.email}`)} styles={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <img
                src={user.profilePictureUrl} alt={user.name}
                width="150px"
                height="150px"
                style={{ borderRadius: "50%" }}
            />
            <ProfileInfo>
                <span>Profile</span>
                <TitleText>{user.username ? user.username : "..."}</TitleText>
                <BulletSeparatedList list={[
                    user.playlists.length + " playlists",
                    user.friends.length + " friends",
                ]} />
            </ProfileInfo>
        </Widget>
    );
};

export default ProfileWidget;