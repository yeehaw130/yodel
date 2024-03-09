import { Navigate } from "react-router-dom";
import { useUserAuth } from "../auth/Auth";
import SideBar from "./Sidebar";
import styled from "styled-components";

const PrivateProxy = ({ children }) => {
    const { loading, user } = useUserAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            {/* <SideBar /> */}
            <Wrapper>
                {children}
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    // margin-left: 200px;
    // padding: 15px; // removed because not intuitive to have padding on the wrapper vs on the root/content itself
    @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 60px;
    }
`;


export default PrivateProxy;
