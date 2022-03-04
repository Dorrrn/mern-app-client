import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Form, Select } from "react-bootstrap";

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
        //navigate(`/users/${user._id}`);
      })
      .catch((error) => {
        const msg = error.response.data.errorMessage;
        console.log("error updating skills...", msg);
        setErrorMessage(msg);
      });
  };

  const handleInputChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="AddSkillToLearn">
      <h2>Add your skills</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      <h4>I want to learn: </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="category">
          {/* <label>
          Category
          <input
            type="text"
            name="category"
            value={inputs.category}
            onChange={handleInputChange}
          />
        </label> */}

          <Form.Select aria-label="Default select example">
            <option>Choose category</option>
            <option
              type="text"
              name="category"
              value={inputs.category}
              onChange={handleInputChange}
            >
              Languages
            </option>
            <option
              type="text"
              name="category"
              value={inputs.category}
              onChange={handleInputChange}
            >
              Sports
            </option>
            <option
              type="text"
              name="category"
              value={inputs.category}
              onChange={handleInputChange}
            >
              Instruments
            </option>
          </Form.Select>

          <label>
            Title
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Add skills</button>
        </Form.Group>
      </Form>
    </div>
  );
}
