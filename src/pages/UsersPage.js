import UserCards from "../components/UserCards";
import "./UsersPage.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Users(props) {
  
  const [foundUsers, setFoundUsers] = useState(props.users);
  const [filterUsers, setFilterUsers] = useState(undefined);
  // const [query, setQuery] = useSearchParams();

  useEffect(() => {
    if (filterUsers) {
      setFoundUsers(
        props.users.filter((filteredUsers) => {
          return filteredUsers.username
            ?.toLowerCase()
            .includes(filterUsers?.toLowerCase());
        })
      );
    } 
  }, [filterUsers]);

  const handleFilterUsers = (e) => {
    const isNotEmpty = !!e.target.value;
    if (isNotEmpty) {
      e.preventDefault();
      setFilterUsers(e.target.value);
      // setQuery({ search: e.target.value });
    } else {
      setFilterUsers(undefined);
    }
  };

  return (
    <div className="UsersPage">
      <h3>See all users</h3>
      <div className="searchbar">
        <p>Searchbar</p>

        <div className="searchbar">
          <form>
            <input
              type="text"
              placeholder="search ... "
              value={filterUsers}
              onChange={handleFilterUsers}
            />
          </form>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {filterUsers ? (
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
