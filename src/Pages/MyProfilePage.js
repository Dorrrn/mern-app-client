import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function MyProfilePage(props) {
  const { user } = useContext(AuthContext);

  let currentUser = user._id;

  if (props.users) {
    currentUser = props.users.find((elm) => {
      return elm._id === currentUser;
    });
  }

  const renderProfileDetails = (elm) => {
    return (
      <>
        <div className="profileDetails" key={elm._id}>
          <h3>Name: {elm.username}</h3>
          <p>E-Mail: {elm.email}</p>
          <p>Motivation: {elm.bio}</p>

          <img src={elm.img} alt={elm.username} />

          <p>My friends:</p>
          {elm.friends?.map((friend) => {
            return <li>{friend.username}</li>;
          })}

          <p>Wants to learn:</p>
          {elm.wantsToLearn?.map((skill) => {
            return <li>{skill.title}</li>;
          })}

          <p>Can teach:</p>
          {elm.wantsToTeach?.map((skill) => {
            return <li>{skill.title}</li>;
          })}
        </div>
      </>
    );
  };

  return (
    <div className="MyProfilePage">
      <h2>My profile</h2>
      {currentUser ? (
        renderProfileDetails(currentUser)
      ) : (
        <p>Sorry no user found...</p>
      )}
    </div>
  );
}
