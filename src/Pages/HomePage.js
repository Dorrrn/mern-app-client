import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage(props) {
  const renderUserProfiles = (list) => {
    return props.users.slice(1, 4).map((elm) => {
      return (
        <>
          <div className="col-md-4 user-cards" key={elm._id}>
            <div className="user-card">
              <div className="user-card-img">
                {elm.img ? (
                  <img src={elm.img} alt={elm.username} />
                ) : (
                  <img src="https://via.placeholder.com/100" />
                )}
              </div>
              <h4 className="username">{elm.username}</h4>
              <div className="row">
                <div className="col-6">
                  <p>
                    <i class="bi bi-bookmark-check"></i> Can teach:
                  </p>
                  {elm.wantsToTeach?.slice(0, 3).map((skill) => {
                    return <p>{skill.title}</p>;
                  })}
                </div>

                <div className="col-6">
                  <p>
                    <i class="bi bi-bookmark-x"></i> Wants to learn:
                  </p>
                  {elm.wantsToLearn?.slice(0, 3).map((skill) => {
                    return <p>{skill.title}</p>;
                  })}
                </div>
              </div>

              <button to={`/users/${elm._id}`} className="user-card-button">
                See profile
              </button>
            </div>
          </div>
        </>
      );
    });
  };

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
              renderUserProfiles(props.users)
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
