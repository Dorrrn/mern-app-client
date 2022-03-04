import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function AddFriend(props) {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
 
  const addNewFriend = () => {
    const storedToken = getToken();

    axios
      .put(`${process.env.REACT_APP_API_URL}/users/${friendId}/addFriend`, {},
      { headers: { Authorization: `Bearer ${storedToken}` }})
      .then(() => {
        props.updateUsers();
        navigate("/users");
      })
      .catch((err) => {
        console.log("error adding friend...", err);
      });
  };

  return (
    <div className="AddFriend">
      {addNewFriend()}
    </div>
  );
}
