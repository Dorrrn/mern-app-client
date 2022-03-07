import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function AddWantsToLearn(props) {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const addWantsToLearn = () => {
    const storedToken = getToken();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/skills/${skillId}/wantstolearn`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        props.fetchUsers();
        return navigate("/skills");
      })
      .catch((err) => {
        console.log("error adding new skill...", err);
      });
  };

  return <div className="AddWantsToLearn">{addWantsToLearn()}</div>;
}
