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
import AddWantsToTeach from "./components/AddWantsToTeach";
import RemoveWantsToLearn from "./components/RemoveWantsToLearn";
import RemoveWantsToTeach from "./components/RemoveWantsToTeach";
import CreateSkill from "./components/CreateSkill";
import Matches from "./components/Matches";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyProfilePage from "./pages/MyProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import UsersPage from "./pages/UsersPage";
import UserProfilePage from "./pages/UserProfilePage";
import SkillsPage from "./pages/SkillsPage";

function App() {
  const [users, setUsers] = useState([]);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
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
          element={
           <IsPrivate>
           <UserProfilePage users={users} />
           </IsPrivate>
           }
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
          path="/profile/update"
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
              <SkillsPage users={users} />
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
          path="/matches"
          element={<Matches users={users} fetchUsers={fetchUsers} />}
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
