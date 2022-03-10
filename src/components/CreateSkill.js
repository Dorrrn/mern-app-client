import axios from "axios";
import "./CreateSkill.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function CreateSkill(props) {
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
  });

  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    const skill = {
      title: inputs.title,
      category: inputs.category,
    };

    const storedToken = getToken();

    axios
      .post(`${process.env.REACT_APP_API_URL}/skills/create`, skill, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.fetchUsers();
        navigate("/skills");
      })
      .catch((error) => {
        const msg = error.response.data.errorMessage;
        console.log("error updating skills...", msg);
        setErrorMessage(msg);
      });
  };

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="CreateSkill">
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="create-skill-form">
        <h3>What do you want to learn?</h3>
        <br />
        <br />
        <select
          value={inputs.category}
          onChange={handleInputChange}
          name="category"
        >
          <option>Choose category</option>
          <option type="text" value="language">
            Language
          </option>
          <option type="text" value="sport">
            Sports
          </option>
          <option type="text" value="instrument">
            Instrument
          </option>
          <option type="text" value="coding language">
            Coding
          </option>
          <option type="text" value="others">
            Others
          </option>
        </select>

        <label>
          Skill to learn
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
            placeholder="e.g. piano"
          />
        </label>
        <button type="submit" className="button-create ">
          add skill
        </button>
      </form>
    </div>
  );
}
