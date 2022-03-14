import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./EditProfilePage.css";

export default function EditProfilePage(props) {
  const { user, getToken } = useContext(AuthContext);

  let currentUser = user?._id;
  if (props.users) {
    currentUser = props.users.find((elm) => {
      return elm._id === currentUser;
    });
  }

  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
    img: currentUser.img,
    bio: currentUser.bio,
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      img: inputs.img,
      bio: inputs.bio,
    };

    const storedToken = getToken();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/auth/update`,
        userDetails,
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

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="EditProfilePage justify-content-center">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="row justify-content-center edit-profile-form"
        >
          <h3>Edit your profile</h3>
          <div className="col-md-12 col-lg-6 d-flex flex-column justify-content-evenly">
            {errorMessage && <p className="error">{errorMessage}</p>}

            <label>
              Username
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleInputChange}
              />
            </label>

            <label>
              E-Mail
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="col-md-12 col-lg-6  d-flex flex-column justify-content-evenly">
            <label>
              What's your motiviation?
              <textarea
                type="text"
                name="bio"
                rows="5"
                maxLength="150"
                value={inputs.bio}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Image (URL)
              <input
                type="text"
                name="img"
                value={inputs.img}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <button
            type="submit"
            className="col-md-12 col-lg-4 button-prim button-margin-top"
          >
            update profile
          </button>
        </form>
      </div>
    </div>
  );
}
