import UserCards from "../components/UserCards";
import "./UsersPage.css";
import Search from "../components/Search";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

export default function Users(props) {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(AuthContext);

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

    // let currentUser = user._id;

    // if (props.users) {
    //   currentUser = props.users.find((elm) => {
    //     return elm._id === currentUser;
    //   });
    // }

  
  // const filterMatches = () => {
  //   const matchList = props.users.filter((elm) => {
  //     return (elm.wantsToTeach[0]._id = user.wantsToLearn._id);
  //   });
  //   props.setUsers(matchList)
  // };

  // console.log("user 0:", props.users[0].wantsToLearn.toString().join(""))

  return (
    <div className="UsersPage">
      <h3>See all users</h3>
      <div className="searchbar">

      <p>Searchbar</p>
        <Search filterUsers={filterUsers} />
      </div>

      {/* <button onClick={ () => filterMatches() } className="btn-top">See matches
     </button> */}

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
