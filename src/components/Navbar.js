import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <NavLink to="/">Home</NavLink> <br /> <br />
      {isLoggedIn && (
        <>
          <NavLink to="/profile">My profile</NavLink> <br />
          <NavLink to="/users/updateskills">Update my skills</NavLink> <br /> <br />
          <NavLink to="/users">All users</NavLink> <br /> <br />
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.email}</span>
          <hr />
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signup">Signup</NavLink> <br />
          <NavLink to="/login">Login</NavLink> <br /> <br />
          <NavLink to="/users">All users</NavLink>
          <hr />
        </>
      )}
    </div>
  );
}
