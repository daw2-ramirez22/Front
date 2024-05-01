//imports
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

//funcion para crear la card que utilida el update y el create tasks
function UserCard({ users }) {
  //para poder borrar usuarios
  const {deleteUser} = useUser()


  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Username : {users.username}</h1>
      </header>
      <p className="text-slate-300 my-2">email :{users.email}</p>

      <div className="flex gap-x-2 pt-2 items-center">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => {
            deleteUser(users._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
//exporto la funcion
export default UserCard;
