import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Header">
      {isLoggedIn && (
        <>
          <div className="navbar">
            <div className="container">
              <div className="nav-link-left">
                <NavLink className="navbar-brand" to="/">
                  tandem
                </NavLink>
                <NavLink to="/users" className="header-link">
                  all users
                </NavLink>
                <NavLink to="/users/updateskills" className="header-link">
                  update skills
                </NavLink>
              </div>
              <div className="nav-link-right">
                <span>{user && user.email}</span>
                <NavLink to="/profile" className="header-button">
                  My profile
                </NavLink>
                <button onClick={logOutUser} className="header-button">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {!isLoggedIn && (
        <>
          <div className="navbar">
            <div className="container">
              <div className="nav-link-left">
                <NavLink className="navbar-brand" to="/">
                  tandem
                </NavLink>
                <NavLink to="/users" className="header-link">
                  all users
                </NavLink>
              </div>
              <div className="nav-link-right">
                <NavLink to="/signup" className="header-button">
                  Signup
                </NavLink>
                <NavLink to="/login" className="header-button">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
