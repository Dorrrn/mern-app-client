import { Link } from "react-router-dom";
import "./SkillsPage.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function SkillsPage(props) {
  const { user } = useContext(AuthContext);

  let currentUserId = user._id;
  if (props.users) {
    currentUserId = props.users.find((elm) => {
      return elm._id === currentUserId;
    });
  }

  const renderMySkills = (elm) => {
    return (
      <>
        <div className="skills-summary">
          <div className="border-bottom">
            <h5>
              <i className="bi bi-bookmark-heart"></i> I want to learn
            </h5>
            <ul>
              {elm.wantsToLearn?.map((skill) => {
                return (
                  <li>
                    {skill.title}
                    <Link to={`/skills/${skill._id}/removewantstolearn`}>
                      x
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="skills-summary">
          <h5>
            <i className="bi bi-bookmark-check"></i> I can teach
          </h5>
          <ul>
            {elm.wantsToTeach?.map((skill) => {
              return (
                <li>
                  {skill.title}
                  <Link to={`/skills/${skill._id}/removewantstoteach`}> x</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  };

  const renderSkillsList = (category) => {
    return props.skills.map((elm) => {
      if (elm.category === category) {
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-4">{elm.title}</div>
                <div className="col-4">
                  <Link to={`/skills/${elm._id}/wantstolearn`}>Learn</Link>
                </div>
                <div className="col-4">
                  <Link to={`/skills/${elm._id}/wantstoteach`}>Teach</Link>
                </div>
              </div>
            </div>
          </>
        );
      }
    });
  };

  return (
    <div className="SkillsPage">
      <div className="container">
        <div className="row">
          <div className="col-4 ">
            <div className="my-skills">
              <h3>My Skills</h3>

              {currentUserId ? (
                renderMySkills(currentUserId)
              ) : (
                <p>no skills found...</p>
              )}
            </div>
          </div>
          <div className="col-8">
            <h4>Language</h4>
            {props.skills ? (
              renderSkillsList("language")
            ) : (
              <p>no skills found...</p>
            )}
            <hr />
            <h4>Instruments</h4>
            {props.skills ? (
              renderSkillsList("instrument")
            ) : (
              <p>no skills found...</p>
            )}
            <hr />
            <h4>Sports</h4>
            {props.skills ? (
              renderSkillsList("sports")
            ) : (
              <p>no skills found...</p>
            )}

            <hr />
            <h4>Coding language</h4>
            {props.skills ? (
              renderSkillsList("coding language")
            ) : (
              <p>no skills found...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
