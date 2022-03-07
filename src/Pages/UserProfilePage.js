import { useParams } from "react-router-dom";
import "./UserProfilePage.css";

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
        <div className="container users-details">
          <div className="row " key={elm._id}>
            <div className="col-7">
              <h3 className="border-bottom">Hi, I am {elm.username}</h3>
              <img src={elm.img} alt={elm.username} />
              <p className="users-quote">{elm.bio}</p>
              <br />
              <a href={`mailto:${elm.email}`} className="users-details-button">
                email
              </a>
              <br />
              <br />
              <a
                href={`/users/${elm._id}/addfriend`}
                className="users-details-button-sec"
              >
                Add as friend
              </a>
            </div>
            <div className="col-5">
              <div className="skills-summary">
                <div className="border-bottom">
                  <h5>
                    <i className="bi bi-bookmark-heart"></i> I want to learn ...
                  </h5>
                  <ul>
                    {elm.wantsToLearn.length > 0 ? (
                      elm.wantsToLearn.map((skill) => {
                        return <li>{skill.title}</li>;
                      })
                    ) : (
                      <p> ... </p>
                    )}
                  </ul>
                </div>
              </div>

              <div className="skills-summary">
                <h5>
                  <i className="bi bi-bookmark-check"></i> I can teach ...
                </h5>
                <ul>
                  {elm.wantsToTeach.length > 0 ? (
                    elm.wantsToTeach.map((skill) => {
                      return <li>{skill.title}</li>;
                    })
                  ) : (
                    <p> ...</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="UserProfilePage">
      {user === null ?  <p>Sorry no users found...</p> : renderProfileDetails(user) }
    </div>
  );

}
