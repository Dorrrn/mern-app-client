import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProviderWrapper } from "../context/auth.context"

export default function FilterControls(props) {

 const { user } = useContext(AuthContext);

 let currentUser = user._id;
 if (props.users) {
   currentUser = props.users.find((elm) => {
     return elm._id === currentUser;
   });
 }


  if (user === null) {
    return (<div>loading…</div>);
  }

  return (
    <div className="UserProfile">
      <h1> User Profile from {user.username}</h1>
    </div>
  )
}



  // const { user } = useContext(AuthContext);
  // const [calledUser, setCalledUser] = useState(user);
  // const [matches, setMatches] = useState();

  //   console.log(user)
  //   console.log(calledUser);

  //   let currentUser = user._id;
  //   if (props.users) {
  //     currentUser = props.users.find((elm) => {
  //       return elm._id === currentUser;
  //     });
  //   }

  //   console.log(currentUser)

  //   if (currentUser === null) {
  //     console.log("sorry....");
  //   }
  //   console.log(mySkills);

  //   const findSkills = (elm) => {
  //     return elm.wantsToLearn?.map((skill) => {
  //       return skill._id;
  //     });
  //   };

  //   const mySkills = findSkills(currentUser);

  //   const myMatches = () => {
  //     if (mySkills === usersSkills) {
  //       const filteredUsers = props.users.filter((elm) => {
  //         return elm;
  //       });
  //     }
  //   };

  //   let newList = [];

  //   const usersSkills = () => {
  //     newList = props.users.filter((elm) => {
  //       return elm.wantsToLearn.map((skill) => {
  //         return skill._id === [...newList];
  //       });
  //     });
  //   };

  // console.log("users", props.users)
  // console.log("users 4", props.users[4].wantsToLearn[0]._id)

  //  console.log("current user...", user.username)

  //    console.log("user 0:", props.users[0].wantsToLearn.toString().join(""))

  // const filterMatches = () => {
  //   const matchList = props.users.filter((elm) => {
  //     return (elm.wantsToTeach[0]._id = user.wantsToLearn._id);
  //   });
  //   props.setUsers(matchList)
  // };

//   return (
//     <div className="FilterControls">
//       {/* <button onClick={() => props.displayMatches(8)} className="btn-top">
//         My matches
//       </button> */}
//       <h1>Filter controls</h1>
//     </div>
//   );
// }
