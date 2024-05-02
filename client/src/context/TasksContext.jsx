//importo react y sus propiedades y mis metodos desde api/task que es donde hare las peticiones
import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest, getAllTaskRequest } from "../api/task";
import { getAllUsersRequest } from "../api/users";

//creo el contexto de las tareas ✅
const TaskContext = createContext();

export const useTasks = () => {
  //creo el contexto
  const context = useContext(TaskContext);
  //si el contexto falla me dara el error definido
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  //devuelvo el contexto
  return context;
};


//creo y exporto el provider para las tareas ✅
export function TaskProvider({ children }) {


  // tareas de un usuario en cocreto
  const [tasks, setTasks] = useState([]);
  // Todas las tareas para el admin
  const [alltasks, setAllTasks] = useState([]);
  const [users, setAllUsers] = useState([]);



  //creo funcon para pedir tareas ✅
  const getTasks = async () => {
    //pericion al baxk
    const res = await getTasksRequest();
    //paso como parametros a set tasks los datos
    setTasks(res.data);

  };

  //creo funcion para crear tareas ✅
  const createTask = async (task) => {
    try {
      //peticion al baxk
      const res = await createTaskRequest(task);
      setTasks((prevAlltask) => [...prevAlltask, res.data]);
      setAllTasks((prevAlltask) => [...prevAlltask, res.data]);

    } catch (error) {
      //muestro error en caso que tenga
      console.log(error);
    }
  }
  //creo funcion para borrar tareas✅
  const deleteTask = async (id) => {
    try {
      //peticion al back
      const res = await deleteTaskRequest(id)

      //devuelvo el nuevo estado de las tareas
      if (res.status === 204) setAllTasks((prevAlltask) => prevAlltask.filter((task) => task._id !== id));
      if (res.status === 204) setTasks((prevAlltask) => prevAlltask.filter((task) => task._id !== id));


    } catch (error) {
      //muestro error en caso que tenga
      console.log(error);
    }
  }

  // creo funcion para pedir tarea ✅
  const getTask = async (id) => {
    try {
      //peticion al back
      const res = await getTaskRequest(id);
      //devuelvo laos datos de la tarea
      //devuelvo el nuevo estado de las tareas
      if (res.status === 204) setTasks((prevAlltask) => prevAlltask.filter((task) => task._id !== id));
      return res.data;
    } catch (error) {
      //muestro error en caso que tenga
      console.error(error);
    }
  }

  //creo funcion para pedir todastarea✅
  const getAllTasks = async () => {
    try {
      //peticion al back
      const res = await getAllTaskRequest();
      //devuelvo laos datos de la tarea
      setAllTasks(res.data);
      //devuelvo el nuevo estado de las tareas
      if (res.status === 204) setAllTasks((prevAlltask) => prevAlltask.filter((task) => task._id !== id));
      return res.data;
    } catch (error) {
      //muestro error en caso que tenga
      console.error(error);
    }
  }
  const getAllUsers = async () => {
    try {
      //peticion al back
      const res = await getAllUsersRequest();
      //devuelvo laos datos de la tarea
      setAllUsers(res.data);
      //devuelvo el nuevo estado de las tareas
      if (res.status === 204) setAllTasks((prevAlltask) => prevAlltask.filter((task) => task._id !== id));
      if (res.status === 204) setTasks((prevAlltask) => prevAlltask.filter((task) => task._id !== id));
      return res.data;
    } catch (error) {
      //muestro error en caso que tenga
      console.error(error);
    }
  }


  //creo funcion para updatear tarea
  const updateTask = async (id, task) => {
    try {
      //peticion al back
      await updateTaskRequest(id, task);
    } catch (error) {
      //muestro error en caso que tenga
      console.error(error);
    }
  };


  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        getAllTasks,
        getAllUsers,
        alltasks,
        users,
      }}
    >
      {children}
    </TaskContext.Provider>
  )

}
