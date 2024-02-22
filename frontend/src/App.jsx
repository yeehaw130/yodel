import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/pages/Login";
// import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Feed from "./components/pages/Home";
import Inbox from './components/pages/Inbox';
import Sidebar from "./components/Sidebar";
import { useContext, useState, useCallback } from "react";
// import { AuthContext } from "./contexts/AuthContext/AuthContext";
// import { NotificationContainer } from "react-notifications";
import styled from "styled-components";

function App() {
	// const { user } = useContext(AuthContext);
	const [rerenderFeed, setRerenderFeed] = useState(0);
	const handleChange = useCallback((newValue) => {
		setRerenderFeed(newValue);
	}, []);

	return (
		<>
			<BrowserRouter>
				<Sidebar user={null} />
				<Content>
					<Routes>
						<Route
							path="/"
							element={
								<Feed rerenderFeed={rerenderFeed} onChange={handleChange} />
								// user ? (
								//   <Feed rerenderFeed={rerenderFeed} onChange={handleChange} />
								// ) : (
								//     <Navigate to="/login" />
								// )
							}
						/>
						{/* <Route
						path="/login"
						element={user ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						path="/signup"
						element={user ? <Navigate to="/" /> : <Signup />}
					/> */}
						<Route
							path="/profile/:username"
							element={
								<Profile rerenderFeed={rerenderFeed} onChange={handleChange} />
								// user ? (
								//   <Profile rerenderFeed={rerenderFeed} onChange={handleChange} />
								// ) : (
								//   <Navigate to="/login" />
								// )
							}
						/>
						<Route path="/inbox" element={
							<Inbox />
						} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Content>
			</BrowserRouter>
		</>
	);
}

// style routes
const Content = styled.div`
  margin-left: 200px;
  padding: 20px;
  @media (max-width: 768px) {
	margin-left: 0;
	margin-top: 60px;
  }
`;

export default App;