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


const ProfileWidget = ({ user, friendCount }) => {
    const navigate = useNavigate();
    const { user: userAuth, logOut } = useUserAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Widget
            className="selectable"
            onClick={() => navigate(`/profile/${userAuth.uid}`)}
            styles={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <img
                src={user.profilePictureUrl ? user.profilePictureUrl : "/img/pig.jpeg"} alt={user.name}
                width="150px"
                height="150px"
                style={{ borderRadius: "50%" }}
                onClick={ handleLogout }
            />
            <ProfileInfo>
                <span>Profile</span>
                <TitleText>{user.username ? user.username : "..."}</TitleText>
                <BulletSeparatedList list={[
                    user.playlistCount + " playlists",
                    friendCount + " friends",
                ]} />
            </ProfileInfo>
        </Widget>
    );
};

export default ProfileWidget;