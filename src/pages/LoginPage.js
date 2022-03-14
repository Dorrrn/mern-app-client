import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./SignUpLogin.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

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
          <div className="form-box row justify-content-center">
            <div className="form-box-left col-md-12 col-lg-8 text-lg-start d-flex flex-column justify-content-evenly">
              <h3>Login</h3>

              <label>
                E-Mail
                <input
                  type="text"
                  name="email"
                  required={true}
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
                  required={true}
                  value={password}
                  onChange={handlePassword}
                  placeholder="password"
                />
              </label>

              <button type="submit" className="col-md-12 col-lg-7 button-prim">
                Login
              </button>
            </div>

            <div className="form-box-right col-md-12 col-lg-4 d-flex flex-column justify-content-center text-center">
              <h6>Not registered yet?</h6>
              <Link className="more-link" to="/signup">
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
