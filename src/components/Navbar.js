import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <NavLink to="/">Home</NavLink> <br />
      {isLoggedIn && (
        <>
          <NavLink to="/profile">My profile</NavLink> <br />
          <NavLink to="/users">All users</NavLink> <br />
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.username}</span>
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signup">Signup</NavLink> <br />
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </div>
  );
}
