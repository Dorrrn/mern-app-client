import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./UpdateProfilePage.css";

export default function UpdateProfilePage(props) {
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    bio: "",
  });

  const [learnInputs, setLearnInputs] = useState({
    title: "",
    category: "",
  });

  const [teachInputs, setTeachInputs] = useState({
    title: "",
    category: "",
  });

  const { user, getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      username: userInputs.username,
      email: userInputs.email,
      password: userInputs.password,
      img: userInputs.img,
      bio: userInputs.bio,
    };

    const skillsToLearn = {
      title: learnInputs.title,
      category: learnInputs.category,
    };

    const skillsToTeach = {
      title: teachInputs.title,
      category: teachInputs.category,
    };

    const storedToken = getToken();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/users/updateprofile`,
        userDetails,
        skillsToLearn,
        skillsToTeach,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        props.fetchUsers();
        navigate("/profile");
      })
      .catch((error) => {
        const msg = error.response.data.errorMessage;
        console.log("error updating profile...", msg);
        setErrorMessage(msg);
      });
  };

  const handleUserInputChange = (e) => {
    setUserInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLearnInputChange = (e) => {
    setLearnInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTeachInputChange = (e) => {
    setTeachInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="UpdateProfilePage">
      <form onSubmit={handleSubmit}>
        <h2>Update your profile</h2>

        <div className="container update-profile-form">
          <div className="row justify-content-center">
            <div className="col-6 d-flex align-items-center flex-column">
              <label>
                username
                <input
                  type="text"
                  name="username"
                  value={userInputs.username}
                  onChange={handleUserInputChange}
                />
              </label>

              <label>
                email
                <input
                  type="email"
                  name="email"
                  value={userInputs.email}
                  onChange={handleUserInputChange}
                />
              </label>

              <label>
                password
                <input
                  type="password"
                  name="password"
                  value={userInputs.password}
                  onChange={handleUserInputChange}
                />
              </label>
            </div>

            <div className="col-6 d-flex align-items-center flex-column">
              <label>
                Why did you join tandem?
                <textarea
                  type="text"
                  name="bio"
                  cols="30"
                  rows="6"
                  maxlength="100"
                  value={userInputs.bio}
                  onChange={handleUserInputChange}
                />
              </label>

              <label>
                image (url)
                <input
                  type="text"
                  name="img"
                  value={userInputs.img}
                  onChange={handleUserInputChange}
                />
              </label>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col">
              <select
                value={learnInputs.learnCategory}
                onChange={handleLearnInputChange}
                name="category"
              >
                <option>Choose category</option>
                <option type="text" value="language">
                  language
                </option>
                <option type="text" value="sports">
                  sports
                </option>
                <option type="text" value="instrument">
                  instrument
                </option>
                <option type="text" value="coding language">
                  coding language
                </option>
              </select>

              <label>
                Title
                <input
                  type="text"
                  name="title"
                  value={learnInputs.learnTitle}
                  onChange={handleLearnInputChange}
                />
              </label>
            </div>
          </div>
          <button type="submit">update profile</button>
        </div>
      </form>
    </div>
  );
}
