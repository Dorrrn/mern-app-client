import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {Navbar, Nav, Container} from "react-bootstrap"


export default function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Header">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/">Features</NavLink>
            <NavLink href="/">Pricing</NavLink>
          </Nav>

        </Container>
      </Navbar>
      <NavLink to="/">Home</NavLink> <br /> <br />
      {isLoggedIn && (
        <>
          <NavLink to="/profile">My profile</NavLink> <br />
          <NavLink to="/users/updateskills">
            Update my skills
          </NavLink> <br /> <br />
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
