import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


export default function UpdateMySkills(props) {
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
  });

  const { user, getToken } = useContext(AuthContext);
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
      .post(`${process.env.REACT_APP_API_URL}/users/updateskills`, skill, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.updateUsers();
        navigate("/");
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
    <div className="AddSkillToLearn">
      <h2>Add your skills</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      <h4>I want to learn: </h4>
      <form onSubmit={handleSubmit}>
     
        <select
          value={inputs.category}
          onChange={handleInputChange}
          name="category"
        >
          <option>Choose category</option>
          <option type="text" value="language">
            Language
          </option>
          <option type="text" value="sports">
            Sports
          </option>
          <option type="text" value="instrument">
            Instrument
          </option>
          <option type="text" value="coding language">
            Coding language
          </option>
        </select>

        <label>
          Title
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">add skill</button>
      </form>
    </div>
  );
}
