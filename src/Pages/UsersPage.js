import UserCards from "../components/UserCards";
import "./UsersPage.css";
import Search from "../components/Search";
import { useState } from "react";

export default function Users(props) {
  const [searchResults, setSearchResults] = useState([]);

  const filterUsers = (searchTerm) => {
    if (searchTerm !== "") {
      const filteredUsers = props.users.filter((elm) => {
        return Object.values(elm)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredUsers);
    } else {
      setSearchResults(props.users);
    }
  };

  return (
    <div className="UsersPage">
      <h3>All users</h3>
      <div className="searchbar">
        <Search filterUsers={filterUsers} />
      </div>

      <div className="container">
        <div className="row justify-content-center">

          {searchResults.length ? (
            <UserCards
              users={searchResults}
              sliceStart="0"
              sliceEnd={searchResults.length}
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
