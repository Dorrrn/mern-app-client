import "./HomePage.css";
import { Link } from "react-router-dom";
import UserCards from "../components/UserCards";

export default function HomePage(props) {
  return (
    <div className="HomePage">
      <header className="header-top">
        <h1 className="headline">languages, sports, music or coding</h1>
        <h4>learn and teach from each other with tandem</h4>
        <button className="header-top-button">Sign up now</button>
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

            {props.users.length > 0 ? (
              <UserCards users={props.users} sliceStart="0" sliceEnd="3" />
            ) : (
              <p>No users found....</p>
            )}
          </div>
        </div>

        <Link to="/users" className="see-more-link">
          See more tandems <i class="bi bi-arrow-right-square"></i>
        </Link>
        <br />
        <br />
      </section>
    </div>
  );
}
