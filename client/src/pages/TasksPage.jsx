//imports
import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";
import imagencole from "../assets/img/imagencole.png";
//funcion para la pagina de tareas
function TasksPage() {
  //importo de useTask el getTask y la tareas
  const { getTasks, tasks } = useTasks();
  //si tiene tareas las mostrara con el getTask()
  useEffect(() => {
    const interval = setInterval(() => {
      getTasks();
    }, 1000); // 1000 milisegundos = 1 segundos
    return () => clearInterval(interval);
  }, []);

  //si esta vacio porque no tengo tareas mandara esto
  if (tasks.length == 0)
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <h1 className="text-3xl font-bold my-2">You don't have any Tasks</h1>
          <img src={imagencole} alt="" />
        </div>
      </div>
    );

  //devuelvo el resultado de las tareas
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}
//exporto la funcion
export default TasksPage;
