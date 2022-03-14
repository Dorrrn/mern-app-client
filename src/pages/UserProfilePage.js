import { useParams, Link } from "react-router-dom";
import "./UserProfilePage.css";

export default function UserProfilePage(props) {
  const { userId } = useParams();

  let user;
  if (props.users) {
    user = props.users.find((elm) => {
      return elm._id === userId;
    });
  }

  const Mailto = ({ email, subject, body, ...props }) => {
    return (
      <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
        {props.children}
      </a>
    );
  };

  const renderProfileDetails = (elm) => {
    return (
      <>
        <div className="container">
          <div className="row users-details" key={elm._id}>
            <div className="col col-sm-12 col-md-6">
              <h3 className="border-bottom">Hi, I am {elm.username}</h3>
              <img src={elm.img} alt={elm.username} />
              <p className="users-quote">{elm.bio}</p>

              <Mailto
                email={elm.email}
                subject={`Hey ${elm.username}`}
                body="Let's connect!"
              >
                <button className="button-sec btn-sm-block" type="button">
                  E-Mail <i class="bi bi-envelope"></i>
                </button>
              </Mailto>

              <Link to={`/users/${elm._id}/addfriend`}>
                <button className="button-prim">
                  Add friend <i class="bi bi-person-plus-fill"></i>
                </button>
              </Link>
            </div>

            <div className="col-sm-12 col-md-6 text-md-left">
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
                <div className="border-bottom">
                  <h5>
                    <i className="bi bi-bookmark-check"></i> I can teach ...
                  </h5>
                  <ul>
                    {elm.wantsToTeach.length > 0 ? (
                      elm.wantsToTeach.map((skill) => {
                        return <li>{skill.title}</li>;
                      })
                    ) : (
                      <p>...</p>
                    )}
                  </ul>
                </div>
              </div>
              <div className="skills-summary">
                <h5>
                  <i class="bi bi-people"></i> Friends: {elm.friends?.length}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="UserProfilePage">
      {user === null ? (
        <p>Sorry no users found...</p>
      ) : (
        renderProfileDetails(user)
      )}
    </div>
  );
}
