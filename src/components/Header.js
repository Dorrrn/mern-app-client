import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Header">
      {!isLoggedIn && (
        <Navbar collapseOnSelect expand="lg" className="header">
          <Navbar.Brand href="/" className="brand-logo">
            tandem
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/users" className="header-link">
                all users
              </Link>
            </Nav>

            <Nav className="mr-auto">
              <Nav.Link
                href="/login"
                className="header-button-sec d-none d-md-block"
              >
                login
              </Nav.Link>
              <Nav.Link
                href="/signup"
                className="header-button d-none d-md-block"
              >
                sign up
              </Nav.Link>

              <Nav.Link href="/login" className="header-link d-md-none">
                login
              </Nav.Link>
              <Nav.Link href="/signup" className="header-link d-md-none">
                sign up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}

      {isLoggedIn && (
        <Navbar collapseOnSelect expand="md" className="header">
          <Navbar.Brand href="/" className="brand-logo">
            tandem
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/users" className="header-link">
                all users
              </Link>
              <Nav.Link href="/skills" className="header-link">
                add skills
              </Nav.Link>
            </Nav>

            <Nav className="mr-auto">
              <span className="user-name d-none d-md-block">
                Hi {user && user.username}
              </span>
              <Nav.Link
                href="/profile"
                className="header-button d-none d-md-block"
              >
                <i class="bi bi-person"></i> profile
              </Nav.Link>

              <button
                onClick={logOutUser}
                className="header-button-sec d-none d-md-block"
              >
                Logout
              </button>

              <Nav.Link href="/profile" className="header-link d-md-none">
                <i class="bi bi-person"></i> profile
              </Nav.Link>

              <button onClick={logOutUser} className="header-link d-md-none">
                Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
}
