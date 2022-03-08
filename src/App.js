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
import Search from "./components/Search";
import FilterControls from "./components/FilterControls";
import AddWantsToTeach from "./components/AddWantsToTeach";
import RemoveWantsToLearn from "./components/RemoveWantsToLearn";

import HomePage from "./pagesname/HomePage";
import LoginPage from "./pagesname/LoginPage";
import SignupPage from "./pagesname/SignupPage";
import MyProfilePage from "./pagesname/MyProfilePage";
import EditProfilePage from "./pagesname/EditProfilePage";
import UsersPage from "./pagesname/UsersPage";
import UserProfilePage from "./pagesname/UserProfilePage";
import SkillsPage from "./pagesname/SkillsPage";
import CreateSkill from "./components/CreateSkill";
import UpdateProfilePage from "./pagesname/UpdateProfilePage-test";
import RemoveWantsToTeach from "./components/RemoveWantsToTeach";

function App() {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  const { getToken, isLoggedIn, isLoggedOut } = useContext(AuthContext);

  useEffect(() => {
    fetchSkills();
    fetchUsers();
  }, []);

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
        <Route
          path="/"
          element={<HomePage users={users} fetchUsers={fetchUsers} />}
        />
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
          path="/users"
          element={<UsersPage users={users} fetchUsers={fetchUsers} />}
        />

        <Route
          path="/users/:userId"
          element={<UserProfilePage users={users} />}
        />
        <Route
          path="/users/:friendId/addfriend"
          element={
            <IsPrivate>
              <AddFriend fetchUsers={fetchUsers} />
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
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <EditProfilePage fetchUsers={fetchUsers} users={users} />
            </IsPrivate>
          }
        />
        <Route
          path="/skills"
          element={
            <IsPrivate>
              <SkillsPage skills={skills} users={users} />
            </IsPrivate>
          }
        />
        <Route
          path="/skills/:skillId/wantstolearn"
          element={
            <IsPrivate>
              <AddWantsToLearn fetchUsers={fetchUsers} />
            </IsPrivate>
          }
        />
        <Route
          path="/skills/:skillId/wantstoteach"
          element={
            <IsPrivate>
              <AddWantsToTeach fetchUsers={fetchUsers} />
            </IsPrivate>
          }
        />
        <Route
          path="/skills/:skillId/removewantstolearn"
          element={
            <IsPrivate>
              <RemoveWantsToLearn fetchUsers={fetchUsers} />
            </IsPrivate>
          }
        />

        <Route
          path="/skills/:skillId/removewantstoteach"
          element={
            <IsPrivate>
              <RemoveWantsToTeach fetchUsers={fetchUsers} />
            </IsPrivate>
          }
        />

        <Route
          path="/skills/create"
          element={
            <IsPrivate>
              <CreateSkill fetchUsers={fetchUsers} />
            </IsPrivate>
          }
        />

        <Route
          path="/updateprofile"
          element={
            <IsPrivate>
              <UpdateProfilePage fetchUsers={fetchUsers} />
            </IsPrivate>
          }
        />

        <Route path="/search" element={<Search />} />

        <Route
          path="/controls"
          element={
            <IsPrivate>
              <FilterControls users={users} fetchUsers={fetchUsers} />
            </IsPrivate>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
