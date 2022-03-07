import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import "./MyProfilePage.css";
import { Link } from "react-router-dom";

export default function MyProfilePage(props) {
  const { user, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    props.fetchUsers();
  },[])

  let currentUser = user._id

  if (props.users) {
    currentUser = props.users.find((elm) => {
      return elm._id === currentUser;
    });
  }
 
  const renderProfileDetails = (elm) => {
    return (
      <>
        <div className="container">
          <div
            className="profile-details row justify-content-center"
            key={elm._id}
          >
            <div className="col-8">
              <div className="container">
                <div className="row border-bottom">
                  <h3 className="border-bottom">Hi {elm.username}</h3>
                  <div className="col-4 circle">
                    <img src={elm.img} alt={elm.username} />
                  </div>
                  <div className="col-8">
                    <p className="user-quote">
                      <i className="bi bi-chat-right-quote"> {elm.bio}</i>
                    </p>
                    <p>{elm.email}</p>

                    <Link to="/profile/update">edit</Link>
                  </div>
                </div>
              </div>

              <div className="skills-summary">
                <div className="border-bottom">
                  <h5>
                    <i className="bi bi-bookmark-heart"></i> I want to learn ...
                  </h5>
                  <ul>
                    {elm.wantsToLearn?.map((skill) => {
                      return <li>{skill.title}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="skills-summary">
                <h5>
                  <i className="bi bi-bookmark-check"></i> I can teach ...
                </h5>
                <ul>
                  {elm.wantsToTeach?.map((skill) => {
                    return <li>{skill.title}</li>;
                  })}
                </ul>
              </div>

              <Link to="/skills" className="profile-button">
                Add skills
              </Link>
            </div>

            <div className="col-4 my-friends">
              <h5>My friends</h5>
              <ul>
                {elm.friends?.map((friend) => {
                  return (
                    <li className="friend-summary border-bottom">
                      <div className="row">
                        <div className="col-5">
                          <img src={friend.img} alt={friend.username} />
                        </div>

                        <div className="col-7">
                          <p>{friend.username}</p>
                          <a
                            href={`/users/${friend._id}`}
                            className="link-to-profile"
                          >
                            <p>
                              <i className="bi bi-arrow-right-square"> </i>
                              profile
                            </p>
                          </a>
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
