import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function MyProfilePage(props) {

const { user } = useContext(AuthContext);

  if (props.users) {
    user = props.users.find((elm) => {
      return elm._id === user._id;
    });
  }

  const renderProfileDetails = (elm) => {
    return (
      <>
        <div className="profileDetails" key={elm._id}>
          <h3>Name: {elm.username}</h3>
          <p>E-Mail: {elm.email}</p>

          <p>My friends:</p>
          {elm.friends?.map((friend) => {
            return <li>{friend.username}</li>;
          })}
        </div>
      </>
    );
  };

  return (
    <div className="MyProfilePage">
      <h2>My profile</h2>
      {user ? renderProfileDetails(user) : <p>Sorry no user found...</p>}
    </div>
  );
}
