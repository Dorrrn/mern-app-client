import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

export default function FilterControls(props) {
  const { user } = useContext(AuthContext);

  let currentUser = user._id

  if (props.users) {
    currentUser = props.users.find((elm) => {
      return elm._id === currentUser;
    });
  }

  console.log(currentUser)


  const mySkills = () => {
      props.users.find((elm) => {
         return elm.wantsToLearn.map((skill) => {
             return skill._id;
         })
     })

  }

let newList = [];

  const filterSkills = () => {
       newList = props.users.filter ((elm) => {
          return elm.wantsToLearn.map ((skill) => {
              return skill._id === [...newList]
          }) 
      })
  }


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

  return (
    <div className="FilterControls">
      {/* <button onClick={() => props.displayMatches(8)} className="btn-top">
        My matches
      </button> */}
      <h1>Filter controls</h1>
    </div>
  );
}
