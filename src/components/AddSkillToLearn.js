import { Navigate, useParams } from "react-router-dom";

export default function AddSkillToLearn() {
  const { skillId } = useParams();


  return <div className="AddSkillToLearn">{/* <Navigate to="/" /> */}</div>;
}
