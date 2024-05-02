import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

import { useUser } from "../context/UserContext";
import UserCard from "../components/UserCard";

function AdminPage() {
  //uso mi funcion auth y le paso el estado de carga y el metodo de isauth
  const { loading, isAuthenticated, user } = useAuth();
  const { getAllTasks, alltasks } = useTasks();

  const {getAllUsers,users, setAllUsers } = useUser()

  const navigate = useNavigate();

  useEffect(() => {
    //si no esta autenticado y esta cargando mandalo al login de vuelta
    if (user.role === "user") {
      navigate("/tasks", { replace: true });
    }
    getAllTasks();
    getAllUsers();
  }, []);
  
  return (
    <div>
      
      <div className="bg-zinc-700 my-3 flex  justify-center py-5 px-10 rounded-lg ">
        <header >
                <h1 className="text-2xl font-bold">Administrator view Users</h1>
            </header>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {users.map((users) => (
          <UserCard users={users} key={users._id} />
        ))}
      </div>
      <div className="bg-zinc-700 my-3 flex  justify-center py-5 px-10 rounded-lg ">
        <header >
                <h1 className="text-2xl font-bold">Administrator view Tasks</h1>
            </header>
      </div>
      <div className="grid sm:grid-cols-2  md:grid-cols-3 gap-2">
        {alltasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}
//exporto la funcion profile
export default AdminPage;
