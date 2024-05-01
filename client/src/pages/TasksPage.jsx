//imports
import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";
import imagencole from "../assets/img/imagencole.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";
//funcion para la pagina de tareas
function TasksPage() {
  //importo de useTask el getTask y la tareas
  const {user} = useAuth();
  const navigate = useNavigate()
  const { getTasks, tasks} = useTasks();
  //si tiene tareas las mostrara con el getTask()
  useEffect(() => {
      getTasks();
  }, []);

  //si esta vacio porque no tengo tareas mandara esto
  if (tasks.length == 0)
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <h1 className="text-3xl font-bold my-2">You dont have any Tasks</h1>
          <img src={imagencole} alt="" />
        </div>
      </div>
    );

  //devuelvo el resultado de las tareas
  // Componente de redireccionamiento
 if (user.role ==="user") {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
 } else {
  return <AdminPage></AdminPage>
 }
 
}
//exporto la funcion
export default TasksPage;
