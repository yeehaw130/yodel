/* eslint-disable react/prop-types */
import { TitleText, Widget } from "./CommonStyles";

const FriendsWidget = ({ friends }) => {
    return (
        <Widget>
            <TitleText>Friends</TitleText>
            <ul>
                {friends.map((friend, i) => (
                    <li key={i}>
                        <img
                            src={friend.profilePicture}
                            alt={friend.name} width="50px"
                            height="50px"
                            style={{ borderRadius: "50%" }}
                        />
                        <span>{friend.name}</span>
                    </li>
                ))}
            </ul>
        </Widget>
    );
};

export default FriendsWidget;