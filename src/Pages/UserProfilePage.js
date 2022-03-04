import { Link, useParams } from "react-router-dom";

export default function UserProfilePage(props) {
  const { userId } = useParams();
  let user;

  if (props.users) {
    user = props.users.find((elm) => {
      return elm._id === userId;
    });
  }
  
  const renderProfileDetails = (elm) => {
    return (
      <>
        <div className="profileDetails" key={elm._id}>
          <h3>Name: {elm.username}</h3>
          <p>E-Mail: {elm.email}</p>

          <p>Friends:</p>
          {elm.friends?.map((friend) => {
            return <li>{friend.username}</li>;
          })}
          <Link to={`/users/${elm._id}/addfriend`}>Add as friend</Link>

        </div>
      </>
    );
  };

  return (
    <div className="UserProfilePage">
      <h2>User profile</h2>
      {user ? renderProfileDetails(user) : <p>Sorry no user found...</p>}
    </div>
  );
}
