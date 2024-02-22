import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/pages/Login";
// import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Feed from "./components/pages/Feed";
import { useContext, useState, useCallback } from "react";
// import { AuthContext } from "./contexts/AuthContext/AuthContext";
// import { NotificationContainer } from "react-notifications";

function App() {
  // const { user } = useContext(AuthContext);
  const [rerenderFeed, setRerenderFeed] = useState(0);
  const handleChange = useCallback((newValue) => {
    setRerenderFeed(newValue);
  }, []);
  return (
    <>
      {/* <NotificationContainer /> */}
      <BrowserRouter>
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;