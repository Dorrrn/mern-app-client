import UserCards from "../components/UserCards";
import "./UsersPage.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function Users(props) {
  const [foundUsers, setFoundUsers] = useState(props.users);
  const { getToken, isLoggedIn } = useContext(AuthContext);

  const getAllUsers = () => {
    setFoundUsers(props.users);
  };

  const getMatches = () => {
    const storedToken = getToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/matches`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setFoundUsers(response.data);
      })
      .catch((e) => console.log("error getting matches...", e));
  };

  return (
    <div className="UsersPage">
      <h3>Find tandems to share your skills</h3>
      {isLoggedIn && (
        <>
          <div className="searchbar">
            <button onClick={getAllUsers} className="button-sec">
              See all users
            </button>
            <button onClick={getMatches} className="button-prim">
              See matches
            </button>
          </div>
        </>
      )}

      {foundUsers ? (
        <UserCards
          users={foundUsers}
          sliceStart="0"
          sliceEnd={foundUsers.length}
        />
      ) : (
        <UserCards
          users={props.users}
          sliceStart="0"
          sliceEnd={props.users.length}
        />
      )}
    </div>
  );
}
