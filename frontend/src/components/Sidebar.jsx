import React from 'react';
import styled from 'styled-components';

const Sidebar = (user) => {
    const { username } = user;
    return (
        <SidebarContainer>
            <StyledLink href="/">Home</StyledLink>
            <StyledLink href={`/profile/${username}`}>Profile</StyledLink>
            <StyledLink href="/inbox">Inbox</StyledLink>
        </SidebarContainer>
    );
};

const StyledLink = styled.a`
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
