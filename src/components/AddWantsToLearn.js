import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function AddWantsToLearn(props) {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { user, getToken } = useContext(AuthContext);
 
  const addWantsToLearn = () => {
    const storedToken = getToken();

    axios
      .put(`${process.env.REACT_APP_API_URL}/skills/${skillId}/wantstolearn`, {},
      { headers: { Authorization: `Bearer ${storedToken}` }})

      .then(() => {
        props.updateUsers();
        navigate(`/users/${user._id}`);
      })
      .catch((err) => {
        console.log("error adding new skill...", err);
      });
  };

  return <div className="AddWantsToLearn">

  <label>
    <input 
      type="checkbox" value=""
    />
  </label>
  {addWantsToLearn()}
  </div>;
}
