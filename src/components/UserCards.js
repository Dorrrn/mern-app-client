import { Link } from "react-router-dom";

export default function UserCards(props) {
  
  const renderUserCards = (list) => {
    return props.users.map((elm) => {
      return (
        <>
          <div className="col-md-4 user-card" key={elm._id}>
            <h2>Name: {elm.username}</h2>
            <p>Teach: {elm.wantsToTeach}</p>

            <p>Teach:</p>
            {elm.wantsToTeach?.map((skill) => {
              return <p>{skill.title}</p>;
            })}

            <p>Learn:</p>
            {elm.wantsToLearn?.map((skill) => {
              return <p>{skill.title}</p>;
            })}

            <Link to={`/users/${elm._id}`}>Go to profile</Link>
          </div>
        </>
      );
    });
  };

  return (
    <div className="UserCards">
    
      {props.users.length > 0 ? (
        renderUserCards(props.users)
      ) : (
        <p>No users found....</p>
      )}
    </div>
  );
}
