import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

export default function Matches() {
  const [matches, setMatches] = useState();
  const { getToken } = useContext(AuthContext);

  const getMatches = () => {
    const storedToken = getToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/matches`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setMatches(response.data);
      })
      .catch((e) => console.log("error matches...", e));
  };

  return <div className="Matches">
  <button onClick={getMatches}>See matches</button>
  </div>;
}
