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
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <header className="header-top justify-content-center">
              <h1 className="headline">
                learn and teach skills from each other
              </h1>
              <h5 className="d-none d-sm-block">
                sports, languages, music, coding, ...
              </h5>
              <br />

              {isLoggedIn ? (
                <Link to="/skills" className="button-prim">
                  Add skills
                </Link>
              ) : (
                <Link to="/signup" className="button-prim">
                  Sign up now
                </Link>
              )}
            </header>
          </div>
        </div>
      </div>

      <section className="users-summary">
        <h3>Find tandems to share your skills</h3>
      
            {props.users ? (
              <UserCards users={props.users} sliceStart="0" sliceEnd="3" />
            ) : (
              <p>No users found....</p>
            )}
      

        <Link to="/users" className="more-link">
          See more tandems <i className="bi bi-arrow-right-square"></i>
        </Link>
        <br />
        <br />
      </section>
    </div>
  );
}
