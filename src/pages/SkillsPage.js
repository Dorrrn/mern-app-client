import { Link } from "react-router-dom";
import "./SkillsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function SkillsPage(props) {
  const { user, getToken } = useContext(AuthContext);
  const [foundSkills, setFoundSkills] = useState("");
  const [filterSkills, setFilterSkills] = useState(undefined);

  let currentUserId = user._id;
  if (props.users) {
    currentUserId = props.users.find((elm) => {
      return elm._id === currentUserId;
    });
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    const storedToken = getToken();

    axios
      .get(`${process.env.REACT_APP_API_URL}/skills`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setFoundSkills(response.data);
        // setFilterSkills(response.data)
      })
      .catch((e) => console.log("error getting list of skills...", e));
  };

  useEffect(() => {
    if (filterSkills) {
      setFoundSkills(
        foundSkills.filter((elm) => {
          return elm.title?.toLowerCase().includes(filterSkills?.toLowerCase());
        })
      );
    }
  }, [filterSkills]);

  const handleFilterSkills = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setFilterSkills(e.target.value);
    } else {
      setFilterSkills();
    }
  };

  const renderMySkills = (elm) => {
    return (
      <>
        <h5>My skills</h5>
        <div className="my-skills-summary">
          <div>
            <h5 className="border-bottom">I want to learn</h5>
            <ul>
              {elm.wantsToLearn?.map((skill) => {
                return (
                  <li>
                    {skill.title}
                    <Link to={`/skills/${skill._id}/removewantstolearn`}>
                      <i className="bi bi-x-circle delete-x"></i>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="my-skills-summary">
          <h5 className="border-bottom">I can teach</h5>
          <ul>
            {elm.wantsToTeach?.map((skill) => {
              return (
                <li>
                  {skill.title}
                  <Link to={`/skills/${skill._id}/removewantstoteach`}>
                    <i className="bi bi-x-circle delete-x"></i>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  };

  const renderSkillsList = (category) => {
    return foundSkills.map((elm) => {
      if (elm.category === category) {
        return (
          <>
            <div className="container d-flex justify-content-center">
              <div className="row col-6">
                <div className="col-6 skill-title">{elm.title}</div>
                <div className="col-3">
                  <Link
                    to={`/skills/${elm._id}/wantstolearn`}
                    className="button-learn"
                  >
                    Learn
                  </Link>
                </div>
                <div className="col-3">
                  <Link
                    to={`/skills/${elm._id}/wantstoteach`}
                    className="button-teach"
                  >
                    Teach
                  </Link>
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
      <div className="skills-page-header">
        <h3>Choose skills to learn and teach</h3>
        <form>
          <input
            className="search-skills"
            type="text"
            placeholder="search for skills"
            value={filterSkills}
            onChange={handleFilterSkills}
          />
        </form>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-7">
            <h4 className="skill-category">
              Languages <i class="bi bi-chat-dots"></i>
            </h4>
            {foundSkills ? (
              renderSkillsList("language")
            ) : (
              <p>no skills found...</p>
            )}
            <hr />
            <h4 className="skill-category">
              Instruments <i class="bi bi-music-note-beamed"></i>
            </h4>
            {foundSkills ? (
              renderSkillsList("instrument")
            ) : (
              <p>no skills found...</p>
            )}
            <hr />
            <h4 className="skill-category">
              Sports
              <i class="bi bi-activity"></i>
            </h4>
            {foundSkills ? (
              renderSkillsList("sport")
            ) : (
              <p>no skills found...</p>
            )}

            <hr />
            <h4 className="skill-category">
              Coding <i class="bi bi-code-square"></i>
            </h4>
            {foundSkills ? (
              renderSkillsList("coding language")
            ) : (
              <p>no skills found...</p>
            )}
            <hr />
            <Link to="/skills/create" className="create-new-link">
              Create new skill <i className="bi bi-arrow-right-square"></i>
            </Link>
          </div>

          <div className="col-5">
            <div className="my-skills">
              {currentUserId ? (
                renderMySkills(currentUserId)
              ) : (
                <p>no skills found...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
