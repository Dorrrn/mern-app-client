import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth.context";

import Header from "./components/Header";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import AddFriend from "./components/AddFriend";
import AddWantsToLearn from "./components/AddWantsToLearn";
import UserCards from "./components/UserCards";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyProfilePage from "./pages/MyProfilePage";
import UsersPage from "./pages/UsersPage";
import UserProfilePage from "./pages/UserProfilePage";
import SkillsPage from "./pages/SkillsPage";
import UpdateMySkills from "./components/UpdateMySkills";

function App() {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  const { getToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
    fetchSkills();
  }, [isLoggedIn]);

  const fetchUsers = () => {
    const storedToken = getToken();

    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => console.log("error getting list of users...", e));
  };

  const fetchSkills = () => {
    const storedToken = getToken();

    axios
      .get(`${process.env.REACT_APP_API_URL}/skills`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setSkills(response.data);
      })
      .catch((e) => console.log("error getting list of skills...", e));
  };

  return (
    <div className="App">
      <Header />
      <Routes>
      
      <Route path="/" element={<HomePage users={users}/>} />

        {/* <Route
          path="/"
          element={
            <HomePage>
              <UserCards users={users} />
            </HomePage>
          }
        /> */}

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
              <AddFriend updateUsers={fetchUsers} />
            </IsPrivate>
          }
        />

        <Route
          path="/skills/:skillId/wantstolearn"
          element={
            <IsPrivate>
              <AddWantsToLearn />
            </IsPrivate>
          }
        />

        <Route
          path="/skillspage"
          element={
            <IsPrivate>
              <SkillsPage skills={skills} />
            </IsPrivate>
          }
        />

        <Route
          path="/users/updateskills"
          element={
            <IsPrivate>
              <UpdateMySkills updateUsers={fetchUsers} />
            </IsPrivate>
          }
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <MyProfilePage users={users} />
            </IsPrivate>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
