import UserCards from "../components/UserCards";
import "./UsersPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function Users(props) {
  const [foundUsers, setFoundUsers] = useState(props.users);
  // const [filterUsers, setFilterUsers] = useState(undefined);
  const { getToken } = useContext(AuthContext);

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

  // useEffect(() => {
  //   if (filterUsers) {
  //     setFoundUsers(
  //       props.users.filter((elm) => {
  //         return elm.username
  //           ?.toLowerCase()
  //           .includes(filterUsers?.toLowerCase());
  //       })
  //     );
  //   }
  // }, [filterUsers]);

  // const handleFilterUsers = (e) => {
  //   if (e.target.value) {
  //     e.preventDefault();
  //     setFilterUsers(e.target.value);
  //   } else {
  //     setFilterUsers();
  //   }
  // };


  return (
    <div className="UsersPage">
      <h3>Find users to share your skills</h3>
      <div className="searchbar">
        {/* <p>Search by name</p>
        <form>
          <input
            type="text"
            placeholder="search ... "
            value={filterUsers}
            onChange={handleFilterUsers}
          />
        </form> */}
        <button onClick={getAllUsers} className="all-users-button">
          See all users
        </button>
        <button onClick={getMatches} className="matches-button">
          See matches
        </button>
      </div>

      <div className="container">
        <div className="row justify-content-center">
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
      </div>
    </div>
  );
}

//  <UserCards
//           users={props.users}
//           sliceStart="0"
//           sliceEnd={props.users.length}
//         />
