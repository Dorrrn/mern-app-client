import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpLogin.css";

function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

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
      .then(() => {
        navigate("/login");
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
        <div class="container">
          <div class="form-box row justify-content-md-center">
            <div class="left-box">
              <h1 className="form-headline">Sign Up</h1>
              <br /> <br /> <br />
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsername}
                placeholder="username"
              />
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
                placeholder="e-mail"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="set password (min. 8 characters)"
              />
              <button type="submit" class="button-form">
                Register
              </button>
            </div>

            <div class="right-box">
              <span class="signinwith">Already have an account? </span>
              <button class="button-form-sec" action="/login">
                Login <i class="bi bi-arrow-right-square"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
