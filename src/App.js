import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth.context";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import AddFriend from "./components/AddFriend";
import AddSkillToLearn from "./components/AddSkillToLearn";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfile from "./pages/UserProfilePage";
import UpdateSkills from "./pages/UpdateSkills";
import UsersPage from "./pages/UsersPage";
import UserProfilePage from "./pages/UserProfilePage";


function App() {
  const [users, setUsers] = useState([]);

  const { getToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, [isLoggedIn]);

  const fetchUsers = () => {
    const storedToken = getToken();

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/users`,
         { headers: { Authorization: `Bearer ${storedToken}` }},
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => console.log("error getting list of users...", e));
  };

  return (
    <div className="App">
      <Navbar />
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

        <Route path="/users" element={<UsersPage users={users} />} />

        <Route
          path="/users/:userId"
          element={<UserProfilePage users={users} />}
        />

        <Route
          path="/users/:friendId/addfriend"
          element={
            <IsPrivate>
              <AddFriend updateUsers={fetchUsers}/>
            </IsPrivate>
          }
        />

        <Route
          path="/skills/:skillId/wantstolearn"
          element={
            <IsPrivate>
              <AddSkillToLearn />
            </IsPrivate>
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

        <Route
          path="/profile/update"
          element={
            <IsPrivate>
              <UpdateSkills />
            </IsPrivate>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
