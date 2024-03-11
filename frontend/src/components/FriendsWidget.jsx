/* eslint-disable react/prop-types */
import { TitleText, Widget, SubtitleText } from "./CommonStyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FriendsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 5px;
    & > li {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
    }
`;

const FriendsWidget = ({ friends }) => {
    const navigate = useNavigate();

    return (
        <Widget styles={{
            overflow: "auto",
            height: "74.5vh",
        }}>
            <TitleText>Friends</TitleText>
            <FriendsList>
                {friends.map((friend, i) => (
                    <li className="selectable" key={i}
                        onClick={() => navigate(`/profile/${friend.userId}`)}>
                        <img
                            src={friend.profilePicture ? friend.profilePicture : "../../img/pig.jpeg"}
                            alt={friend.name}
                            width="60px"
                            height="60px"
                            style={{ borderRadius: "50%" }}
                        />
                        <SubtitleText style={{ paddingLeft: "20px" }}>{friend.name}</SubtitleText>
                    </li>
                ))}
            </FriendsList>
        </Widget>
    );
};

export default FriendsWidget;