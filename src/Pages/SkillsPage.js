import { Link } from "react-router-dom";
import "./SkillsPage.css"
import AddWantsToLearn from "../components/AddWantsToLearn";

export default function SkillsPage(props) {
  const renderSkillsToLearn = (list) => {
    return props.skills.map((elm) => {
      return (
        <div className="links-skills">
          <Link to={`/skills/${elm._id}/wantstolearn`}>{elm.title}</Link>
        </div>
      );
    });
  };

  let skillsToLearn;
  if (props.skills) {
    skillsToLearn = props.skills.find((elm) => {
      return elm.title === skillsToLearn;
    });
  }

  const renderSkillsToTeach = (list) => {
    return props.skills.map((elm) => {
      return (
        <div className="links-skills">
          <Link to={`/skills/${elm._id}/wantstoteach`}> {elm.title}</Link>
        </div>
      );
    });
  };

  let skillsToTeach;
  if (props.skills) {
    skillsToTeach = props.skills.find((elm) => {
      return elm.title === skillsToTeach;
    });
  }

  return (
    <div className="SkillsPage">
      <div className="container">
        <div className="row">
          <div className="col-6 skillsToLearn">
            <h4>Wanna learn:</h4>
            {props.skills ? (
              renderSkillsToLearn(props.skillsToLearn)
            ) : (
              <p>no skills found...</p>
            )}
          </div>

          <div className="col-6 skillsToLearn">
            <h4>Can teach:</h4>
            {props.skills ? (
              renderSkillsToTeach(props.skillsToTeach)
            ) : (
              <p>no skills found...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
