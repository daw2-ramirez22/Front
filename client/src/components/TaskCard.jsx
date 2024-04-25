//imports
import { useTasks } from "../context/TasksContext"
import { Link } from "react-router-dom";

//funcion para crear la card que utilida el update y el create tasks
function TaskCard({ task }) {
    //para poder borrar tareas
    const {deleteTask} = useTasks()
    
    return(
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                
            </header>
            <p className="text-slate-300 my-2">{task.description}</p>
            <p className="font-bold">{new Date (task.date).toLocaleDateString()}</p>
            <div className="flex gap-x-2 pt-2 items-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                        deleteTask(task._id)
                    }}>Delete</button>
                    <Link to={`/task/${task._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >Edit</Link>
                </div>
        </div>
          
    )
}
//exporto la funcion
export default TaskCard