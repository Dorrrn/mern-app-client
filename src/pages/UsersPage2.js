import UserCards from '../components/UserCards';
import './UsersPage.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

export default function Users(props) {
   const { getToken, isLoggedIn } = useContext(AuthContext);
   const [foundUsers, setFoundUsers] = useState(props.users);
   const [filterUsers, setFilterUsers] = useState('');
   const [filteredUsersArr, setFilteredUsersArr] = useState(props.users);

   useEffect(() => {
      getAllUsers();
   }, []);

   const getAllUsers = () => {
      setFoundUsers(props.users);
      setFilteredUsersArr(props.users);
   };

   useEffect(() => {
      setFilteredUsersArr(
         foundUsers.filter((elm) => {
            return (
               elm.username?.toLowerCase().includes(filterUsers?.toLowerCase()) ||
               elm.wantsToTeach?.map((skill) => {
                  return skill.title.toLowerCase().includes(filterUsers?.toLowerCase());
               }) ||
               elm.wantsToLearn?.map((skill) => {
                  return skill.title.toLowerCase().includes(filterUsers?.toLowerCase());
               })
            );
         })
      );
   }, [filterUsers]);

   const handleFilterUsers = (e) => {
      e.preventDefault();
      setFilterUsers(e.target.value);
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
         .catch((e) => console.log('error getting matches...', e));
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

         <form>
            <input
               className="search-users"
               type="text"
               placeholder="search for users"
               value={filterUsers}
               onChange={handleFilterUsers}
            />
         </form>

         {filteredUsersArr ? (
            <UserCards users={foundUsers} sliceStart="0" sliceEnd={foundUsers.length} />
         ) : (
            <p>no users found...</p>
         )}
      </div>
   );
}
