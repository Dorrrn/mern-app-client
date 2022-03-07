import { Link } from "react-router-dom";
import "./Header.css";

export default function Footer() {
  return (
    <div className="Footer">
      <p>
        <i className="bi bi-bookmark-heart-fill"></i>  tandem 2022
      </p>
      <Link to="/controls">Controls</Link> 
    </div>
  );
}
