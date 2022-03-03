import { Navigate, useParams } from "react-router-dom";

export default function AddFriend(props) {
  const { userId } = useParams();
//   let user;

//   if (props.users) {
//     user = props.users.find((elm) => {
//       return elm._id === userId;
//     });
//   }

  return (
    <div className="AddFriend">
      <Navigate to="/" />
    </div>
  );
}
