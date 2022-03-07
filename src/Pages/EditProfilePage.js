import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./EditProfilePage.css"

export default function EditProfilePage(props) {
  const { user, getToken } = useContext(AuthContext);

   let currentUserId = user._id
   if (props.users) {
     currentUserId = props.users.find((elm) => {
       return elm._id === currentUserId;
     });
   }

  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
    img: currentUserId.img,
    bio: currentUserId.bio,
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
      .put(`${process.env.REACT_APP_API_URL}/auth/profile/update`, userDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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
    <div className="EditProfilePage">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <h2>Edit your profile</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 d-flex align-items-center flex-column justify-content-evenly">
              <label>
                username
                <input
                  type="text"
                  name="username"
                  value={inputs.username}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                email
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                password
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="col-6 d-flex align-items-center flex-column justify-content-evenly">
              <label>
                what's your motiviation?
                <textarea
                  type="text"
                  name="bio"
                  rows="5"
                  maxlength="150"
                  value={inputs.bio}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                image (url)
                <input
                  type="text"
                  name="img"
                  value={inputs.img}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>

          <button type="submit" className="button-edit-profile">
            update profile
          </button>
        </div>
      </form>
    </div>
  );
}
