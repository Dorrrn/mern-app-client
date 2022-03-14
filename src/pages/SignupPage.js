import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpLogin.css";
import { AuthContext } from "../context/auth.context";

function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext); //extract storeToken from AuthContext

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      username,
      email,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, userDetails)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const msg = error.response.data.errorMessage;
        console.log("error creating new user...", msg);
        setErrorMessage(msg);
      });
  };

  return (
    <div className="SignupPage">
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSignupSubmit}>
        <div className="container">
          <div className="form-box row justify-content-center">
            <div className="form-box-left col-md-12 col-lg-8 text-lg-start d-flex flex-column justify-content-evenly">
              <h3>Sign Up</h3>

              <label>
                Username
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsername}
                  placeholder="username"
                />
              </label>
              <label>
                E-Mail
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="name@mail.com"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="min. 8 characters"
                />
              </label>
              <button type="submit" className="col-md-12 col-lg-7 button-prim">
                Register
              </button>
            </div>

            <div className="form-box-right col-md-12 col-lg-4 d-flex flex-column justify-content-center text-center">
              <h6>Already have an account? </h6>
              <Link className="more-link" to="/login">
                Login <i className="bi bi-arrow-right-square"></i>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
