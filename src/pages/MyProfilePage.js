import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./MyProfilePage.css";
import { Link } from "react-router-dom";

export default function MyProfilePage(props) {
  const { user } = useContext(AuthContext);

  let currentUser = user?._id;

  if (props.users) {
    currentUser = props.users.find((elm) => {
      return elm._id === currentUser;
    });
  }

  const renderProfileDetails = (elm) => {
    return (
      <>
        <div className="container">
          <div className="row profile-details" key={elm._id}>
            <div className="col col-sm-12 col-md-7">
              <div className="my-details">
                <h3 className="border-bottom">Hi {elm.username}</h3>
                {elm.img ? (
                  <img src={elm.img} alt={elm.username} />
                ) : (
                  <img src="https://via.placeholder.com/50" alt="userimage" />
                )}
                <p>{elm.email}</p>
                <div className="user-quote">
                  <p>
                  " {elm.bio} "
                  </p>
                </div>
                <Link to="/profile/update" className="button-sec">
                  update
                </Link>
              </div>

                
              <h4 className="border-bottom">My skills</h4>
              <div className="skills-summary border-bottom">
                  <h5>
                    <i className="bi bi-bookmark-heart"></i> I want to learn
                  </h5>
                  <ul>
                    {elm.wantsToLearn?.map((skill) => {
                      return <li>{skill.title}</li>;
                    })}
                  </ul>
                
              </div>
              <div className="skills-summary">
                <h5>
                  <i className="bi bi-bookmark-check"></i> I can teach
                </h5>
                <ul>
                  {elm.wantsToTeach?.map((skill) => {
                    return <li>{skill.title}</li>;
                  })}
                </ul>
              </div>

              <Link to="/skills" className="button-prim">
                Edit my skills
              </Link>
            </div>

            <div className="col-sm-12 col-md-5 my-friends">
              <h4 className="text-center border-bottom">My friends</h4>
              <ul>
                {elm.friends?.map((friend) => {
                  return (
                    <li className="friend-summary border-bottom">
                      <div className="row">
                        <div className="col-6">
                          <img src={friend.img} alt={friend.username} />
                        </div>

                        <div className="col-6 text-start">
                          <p className="friend-name">{friend.username}</p>
                          <Link
                            to={`/users/${friend._id}`}
                            className="link-to-profile"
                          >
                            <p>
                              <i className="bi bi-arrow-right-square"> </i>
                              profile
                            </p>
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="MyProfilePage">
      {currentUser ? (
        renderProfileDetails(currentUser)
      ) : (
        <p>Sorry no user found...</p>
      )}
    </div>
  );
}
