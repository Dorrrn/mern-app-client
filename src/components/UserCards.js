import "./UserCards.css";

export default function UserCards(props) {

  const renderUserProfiles = (list) => {
    return props.users.slice(props.sliceStart, props.sliceEnd).map((elm) => {
      return (
        <>
          <div className="col-md-4 user-cards" key={elm._id}>
            <div className="user-card">
              <div className="user-card-img">
                {elm.img ? (
                  <img src={elm.img} alt={elm.username} />
                ) : (
                  <img src="https://via.placeholder.com/100" alt="userimage"/>
                )}
              </div>
              <h4 className="username">{elm.username}</h4>
              <div className="row">
                <div className="col-6">
                  <p>
                    <i class="bi bi-bookmark-check"></i> Can teach:
                  </p>
                  {elm.wantsToTeach?.slice(0, 3).map((skill) => {
                    return <p>{skill.title}</p>;
                  })}
                </div>

                <div className="col-6">
                  <p>
                    <i class="bi bi-bookmark-x"></i> Wants to learn:
                  </p>
                  {elm.wantsToLearn?.slice(0, 3).map((skill) => {
                    return <p>{skill.title}</p>;
                  })}
                </div>
              </div>

              <button to={`/users/${elm._id}`} className="user-card-button">
                See profile
              </button>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <div className="UserCards">
      <div className="container">
        <div className="row justify-content-center">

          {props.users.length > 0 ? (
            renderUserProfiles(props.users)
          ) : (
            <p>No users found....</p>
          )}
        </div>
      </div>
    </div>
  );
}
