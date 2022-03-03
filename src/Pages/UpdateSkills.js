import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export default function UpdateSkills(props) {
  const [wantsToLearn, setWantsToLearn] = useState();
  const [wantsToTeach, setWantsToTeach] = useState();

  const { getToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleWantsToLearn = (e) => setWantsToLearn(e.target.value);
  const handleWantsToTeach = (e) => setWantsToTeach(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const skillDetails = {
      wantsToLearn,
      wantsToTeach,
    };

    const storedToken = getToken();

    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, skillDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("error updating profile...", err);
      });
  };

  return (
    <div className="UpdateSkills">
      <h2>Update your skills</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Things I want to learn:
          <input
            type="text"
            name="wantsToLearn"
            value={wantsToLearn}
            onChange={handleWantsToLearn}
          />
        </label>

        <label>
          Things I can teach:
          <input
            type="text"
            name="wantsToTeach"
            value={wantsToTeach}
            onChange={handleWantsToTeach}
          />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
