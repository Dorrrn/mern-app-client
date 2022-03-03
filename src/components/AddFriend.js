import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function AddFriend(props) {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //console.log(user);

  const addFriend = () => {
    const friend = { friends: friendId };
    axios
      .patch(`${process.env.REACT_APP_API_URL}/users/${user._id}`, friend)
      .then((response) => {
        console.log(response.data);
        props.updateUsers();
        navigate("/");
      })
      .catch((err) => {
        console.log("error adding friend...", err);
      });
  };

  return (
    <div className="AddFriend">
      <button onClick={addFriend}>Add friend</button>
    </div>
  );
}
