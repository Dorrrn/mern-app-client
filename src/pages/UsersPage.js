import UserCards from "../components/UserCards";
import "./UsersPage.css";
import { useEffect, useState } from "react";

export default function Users(props) {
  const [foundUsers, setFoundUsers] = useState(props.users);
  const [filterUsers, setFilterUsers] = useState(undefined);

    useEffect(() => {
      setFoundUsers(props.users);
    }, []);

  useEffect(() => {
    if (filterUsers) {
      setFoundUsers(
        props.users.filter((elm) => {
          return elm.username
            ?.toLowerCase()
            .includes(filterUsers?.toLowerCase());
        })
      );
    }
  }, [filterUsers]);

  // useEffect(() => {
  //   if (filterUsers) {
  //     setFoundUsers(
  //       props.users.filter((elm) => {
  //          return elm.wantsToLearn?.map((skill) => {
  //            return skill.title?.toLowerCase()
  //            .includes(filterUsers?.toLowerCase());
  //         })
  //       })
  //     );
  //   }
  // }, [filterUsers]);

  const handleFilterUsers = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setFilterUsers(e.target.value);
    } else {
      setFilterUsers(undefined);
    }
  };

  return (
    <div className="UsersPage">
      <h3>See all users</h3>
      <div className="searchbar">
        <p>Searchbar</p>
        <form>
          <input
            type="text"
            placeholder="search ... "
            value={filterUsers}
            onChange={handleFilterUsers}
          />
        </form>
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
