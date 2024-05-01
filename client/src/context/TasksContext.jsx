//importo react y sus propiedades y mis metodos desde api/task que es donde hare las peticiones
import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest, getAllTaskRequest } from "../api/task";

//creo el contexto de las tareas
const TaskContext = createContext();

export const useTasks = () => {
    //creo el contexto
    const context = useContext(TaskContext);
    //si el contexto falla me dara el error definido
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    //devuelvo el contexto
    return context;
  };
  

//creo y exporto el provider para las tareas
export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([]);
  const [alltasks, setAllTasks] = useState([]);
  

  //creo funcon para pedir tareas
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const getTasks = async () => {
      
      //pericion al baxk
      const res = await getTasksRequest();
      //paso como parametros a set tasks los datos
      setTasks(res.data);
      
    };
      
  //creo funcion para crear tareas   
  const createTask = async (task) => {
      try {
          //peticion al baxk
          const res = await createTaskRequest(task);
          setTriggerUpdate(!triggerUpdate);
      } catch (error) {
          //muestro error en caso que tenga
          console.log(error);
      }
  }
  //creo funcion para borrar tareas
  const deleteTask = async (id) => {
      try {
         //peticion al back
          const res = await deleteTaskRequest(id)
          //si falla decuelvo el estado 204
          if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
          setTriggerUpdate(!triggerUpdate);
      } catch (error) {
          //muestro error en caso que tenga
          console.log(error);
      } 
  }
  //creo funcion para pedir tarea
  const getTask = async (id) => {
      try {
        //peticion al back
        const res = await getTaskRequest(id);
        //devuelvo laos datos de la tarea
        return res.data;
      } catch (error) {
        //muestro error en caso que tenga
        console.error(error);
      }
  }
    //creo funcion para pedir todastarea
    const getAllTasks = async () => {
      try {
        //peticion al back
        const res = await getAllTaskRequest();
        //devuelvo laos datos de la tarea
        setAllTasks(res.data);
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
        setTriggerUpdate(!triggerUpdate);
      } catch (error) {
        //muestro error en caso que tenga
        console.error(error);
      }
  };

  
  return(
    <TaskContext.Provider
        value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask,
            getAllTasks,
            triggerUpdate,
            alltasks,
        }}
    >
        {children}
    </TaskContext.Provider>
  )

}
