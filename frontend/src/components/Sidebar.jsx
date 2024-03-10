import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from "../auth/Auth";

const Sidebar = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <SidebarContainer>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to={`/profile/${user.uid}`}>Profile</StyledLink>
            <StyledLink to="/inbox">Inbox</StyledLink>
            <StyledLink to="#" onClick={handleLogout}>Logout</StyledLink>
        </SidebarContainer>
    );
};

const StyledLink = styled(Link)`
    margin: 10px 0;
    text-decoration: none;
    color: black;
    &:hover {
        color: #00b4d8;
    }
`;

const SidebarContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 200px;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    a {
        margin: 10px 0;
        text-decoration: none;
        color: black;
    }
    a:hover {
        color: #00b4d8;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 60px;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 0;
    }
`;



export default Sidebar;
