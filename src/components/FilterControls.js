import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

export default function FilterControls(props) {
  const { user } = useContext(AuthContext);

  let currentUserId = user._id;
  if (props.users) {
    currentUserId = props.users.find((elm) => {
      return elm._id === currentUserId;
    });
  }

  const findLearnSkills = (elm) => {
    return elm.wantsToLearn?.map((skill) => {
      return skill._id;
    });
  };

  const mySkills = findLearnSkills(currentUserId);
  console.log("my skills...", mySkills);

  const findTeachSkills = (elm) => {
    return elm.wantsToTeach?.map((skill) => {
      return skill._id;
    });
  };

  const otherUsersSkills = props.users.map((elm) => {
    return findTeachSkills(elm);
  });
  console.log("skills of other users...", otherUsersSkills);

  const matchingSkills = mySkills?.map((elm) => {
    elm._id = otherUsersSkills.find((match) => {
      return match._id === elm._id;
    });
  });

  const matches = otherUsersSkills?.map ((arr) => {
      return arr.map((arrElm) => {
         return arrElm._id = mySkills.find ((skill) => {
              return skill._id === arrElm._id
          })
      })
  })
  console.log("...matches...", matches);

  return (
    <div className="FilterControls">
      <h1>....</h1>
    </div>
  );
}

// console.log("users", props.users)
// console.log("users 4", props.users[4].wantsToLearn[0]._id)
//  console.log("current user...", user.username)
//  console.log("user 0:", props.users[0].wantsToLearn.toString().join(""))
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
