import "./UserCards.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function UserCards(props) {
  const { user } = useContext(AuthContext);
  let currentUserId = user?._id;

  const renderUserProfiles = (list) => {
    return (
      props.users
        .filter(user => user._id.toString() !== currentUserId)
        .slice(props.sliceStart, props.sliceEnd)
        .map((elm) => {
          return (
            <>
              <div className="col-sm-10 col-md-6 col-lg-4" key={elm._id}>
                <div className="user-card justify-content-center d-flex flex-column">
                  <div className="user-card-img">
                    {elm.img ? (
                      <img src={elm.img} alt={elm.username} />
                    ) : (
                      <img
                        src="https://via.placeholder.com/100"
                        alt="userimage"
                      />
                    )}
                  </div>
                  <h6 className="username">{elm.username}</h6>
                  <div className="row">
                    <div className="col-6">
                      <p className="user-skills-title">
                        <i
                          className="bi bi-bookmark-check"
                          id="skills-icon"
                        ></i>{" "}
                        teach
                      </p>
                      {elm.wantsToTeach?.slice(0, 3).map((skill) => {
                        return <p className="user-skills">{skill.title}</p>;
                      })}
                    </div>

                    <div className="col-6">
                      <p className="user-skills-title">
                        <i className="bi bi-bookmark-x" id="skills-icon"></i>{" "}
                        learn
                      </p>
                      {elm.wantsToLearn?.slice(0, 3).map((skill) => {
                        return <p className="user-skills">{skill.title}</p>;
                      })}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link to={`/users/${elm._id}`} className="button-sec">
                      See profile
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })
    );
  };

  return (
    <div className="UserCards">
      <div className="container">
        <div className="row justify-content-center">
          {props.users ? (
            renderUserProfiles(props.users)
          ) : (
            <p>No users found....</p>
          )}
        </div>
      </div>
    </div>
  );
}
