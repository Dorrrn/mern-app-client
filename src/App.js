import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfile from "./pages/UserProfile";
import { AuthContext } from "./context/auth.context";

function App() {
  const [profiles, setProfiles] = useState([]);

  const { getToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, [isLoggedIn]);

  const fetchUsers = () => {
    const storedToken = getToken();

    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((e) => console.log("error getting list of users...", e));
  };

  return (
    <div className="App">
      <Navbar />
      <h1>Tandem App</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
