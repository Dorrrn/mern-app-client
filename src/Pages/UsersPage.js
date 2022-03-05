import UserCards from "../components/UserCards";

export default function Users(props) {

  return (
    <div className="Users">
      <h3>All users</h3>
      <div className="container">
        <div className="row justify-content-center">
          {props.users.length > 0 ? (
            <UserCards users={props.users} sliceStart="0" sliceEnd={props.users.length} />
          ) : (
            <p>No users found....</p>
          )}
        </div>
      </div>
    </div>
  );
}
