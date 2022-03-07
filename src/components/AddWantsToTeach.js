import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function AddWantsToTeach(props) {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const addWantsToTeach = () => {
    const storedToken = getToken();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/skills/${skillId}/wantstoteach`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )

      .then(() => {
        props.updateUsers();
        return navigate("/profile");
      })
      .catch((err) => {
        console.log("error adding new skill...", err);
      });
  };

  return <div className="AddWantsToTeach">{addWantsToTeach()}</div>;
}
