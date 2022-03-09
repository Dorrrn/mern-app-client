import "./HomePage.css";
import { Link } from "react-router-dom";
import UserCards from "../components/UserCards";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function HomePage(props) {
  const { isLoggedIn } = useContext(AuthContext);
  // const randomIndex = Math.floor(Math.random() * (props.users.length - 3))

  return (
    <div className="HomePage">
      <header className="header-top">
        <h1 className="headline">sports, languages, music or coding</h1>
        <h4>learn and teach from each other with tandem</h4>

        {isLoggedIn && (
          <Link to="/skills" className="header-top-button">
            Add skills
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup" className="header-top-button">
            Sign up now
          </Link>
        )}
        <img
          src="/images/tandem-visual.png"
          alt="tandem-visual"
          className="header-visual"
        />
      </header>

      <section className="users-summary">
        <h2>Find tandems to share your skills</h2>
        <div className="container">
          <div className="row justify-content-center">
            {props.users ? (
              <UserCards users={props.users} sliceStart="0" sliceEnd="3" />
            ) : (
              <p>No users found....</p>
            )}
          </div>
        </div>

        <Link to="/users" className="see-more-link">
          See more tandems <i className="bi bi-arrow-right-square"></i>
        </Link>
        <br />
        <br />
      </section>
    </div>
  );
}
