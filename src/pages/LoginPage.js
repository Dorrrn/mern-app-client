import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./SignUpLogin.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); //extract storeToken from AuthContext

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      email,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, userDetails)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const msg = error.response.data.errorMessage;
        console.log("error logging in...", msg);
        setErrorMessage(msg);
      });
  };

  return (
    <div className="LoginPage">
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleLoginSubmit}>
        <div className="container">
          <div className="form-box row justify-content-md-center">
            <div className="left-box">
              <h1 className="form-headline">Login</h1>
              <br /> <br /> <br />
              <input
                type="text"
                name="email"
                required={true}
                value={email}
                onChange={handleEmail}
                placeholder="e-mail"
              />
              <input
                type="password"
                name="password"
                required={true}
                value={password}
                onChange={handlePassword}
                placeholder="password"
              />
              <button type="submit" className="button-form">
                Login
              </button>
            </div>

            <div className="right-box-login">
              <span className="signinwith">Not registered yet? </span>
              <Link className="button-form-sec" to="/signup">
                Sign up <i className="bi bi-arrow-right-square"></i>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
