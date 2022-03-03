import { Link } from "react-router-dom";

export default function Users(props) {
  const renderUserProfiles = (list) => {
    return props.users.map((elm) => {
      return (
        <li className="profile-card" key={elm._id}>
          <h2>Name: {elm.username}</h2>
          <p>Email: {elm.email}</p>
          <p>Friends: {elm.friends?.join("")}</p>
          <Link to={`/users/${elm._id}`}>Go to profile</Link>
          <hr />
        </li>
      );
    });
  };

  return (
    <div className="Users">
      <h3>All users</h3>
      <ul>
        {props.users.length > 0 ? (
          renderUserProfiles(props.users)
        ) : (
          <p>No users found....</p>
        )}
      </ul>
    </div>
  );
}
