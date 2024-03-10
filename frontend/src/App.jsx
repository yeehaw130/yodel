import './App.css'
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Inbox from './components/pages/Inbox';
import { useState, useCallback } from "react";
import PrivateView from './components/PrivateView';
import Home from './components/pages/Home';
import { UserAuthContextProvider } from "./auth/Auth";

function App() {
	const [rerenderFeed, setRerenderFeed] = useState(0);
	const handleChange = useCallback((newValue) => {
		setRerenderFeed(newValue);
	}, []);

	return (
		<UserAuthContextProvider>
			<Routes>
				<Route path="/" element={
					<PrivateView>
						<Home rerenderFeed={rerenderFeed} onChange={handleChange} />
					</PrivateView>
				} />
				<Route path="/profile/:userId" element={
					<PrivateView>
						<Profile rerenderFeed={rerenderFeed} onChange={handleChange} />
					</PrivateView>
				} />
				<Route path="/inbox" element= {
					<PrivateView>
						<Inbox rerenderFeed={rerenderFeed} onChange={handleChange} />
					</PrivateView>
				} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</UserAuthContextProvider>
	);
}

export default App;