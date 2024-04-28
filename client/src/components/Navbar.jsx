//imports de authcontext y link
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//creo una funcion para la "barra de navegacion" que aparece en la parte superior
function Navbar() {
  //utilico el metodo auth y le paso como parametros el usuario, la funcion de deslogear y si esta autenticado
  const { isAuthenticated, logout, user } = useAuth();

  //devuelvo la "barra de navegacion"
  return (
    <div>
      <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg ">
        <Link to={isAuthenticated ? "/Tasks" : "/"}>
          <h1 className=" text-2xl font-bold">Task Manager</h1>
        </Link>

        <ul className="grid sm:grid-cols-3 md:grid-cols-4 gap-2 ">
          {isAuthenticated ? (
            <>
              <li className=" text-1xl font-bold">{user.username}</li>
              <li>
                <Link
                  to="/add-task"
                  className="bg-indigo-500 px-4 py-1  rounded-md"
                >
                  Add Task
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="bg-red-800 hover:bg-red-900 text-white px-4 py-1 my-2 rounded-md"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-indigo-500 px-4 py-1 rounded-md"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-indigo-500 px-4 py-1 rounded-md"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
//exporto la funcion
export default Navbar;
