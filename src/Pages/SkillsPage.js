import { Link } from "react-router-dom";

export default function SkillsPage(props) {

  const renderLanguageSkills = (list) => {
    return props.skills.map((elm) => {

      return (
        <div className="links-skills">
          <Link to={`/skills/${elm._id}/wantstolearn`}>Add skill: {elm.title}</Link>
        </div>
      );
    })
  };

  let skill;
  if (props.skills) {
    skill = props.skills.find((elm) => {
      return elm.title === skill;
    });
  }

  return (
    <div className="UpdateSkillsPage">
      <section className="language-skills">
        <h4>What do you want to learn?</h4>
{props.skills? renderLanguageSkills(props.skill) : <p>no skills found...</p>}

      </section>
    </div>
  );
}
