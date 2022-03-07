import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function RemoveWantsToLearn(props) {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
 
  const removeWantsToLearn = () => {
    const storedToken = getToken();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/skills/${skillId}/removewantstolearn`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        props.fetchUsers();
        return navigate("/skills");
      })
      .catch((err) => {
        console.log("error removing skill...", err);
      });
  };

  return <div className="RemoveWantsToLearn">{removeWantsToLearn()}</div>;
}
