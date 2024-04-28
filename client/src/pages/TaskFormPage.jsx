//imports
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)

//funcion para el formulario de tareas
function TaskFormPage() {
  //paso variables para si esta registrado conseguir las teareas, crearlas y updatearlas
  const {register, handleSubmit, setValue} = useForm()
  const {createTask, getTask, updateTask} = useTasks()
  const navigate = useNavigate()
  const params = useParams()
  const {isAuthenticated} = useAuth()

  
  useEffect(() => {
    
    async function loadTask() {
      if(params.id){
        //muestro la tarea filtrando por id en caso que le haya dado al editar
        const task = await getTask(params.id)

          //decimos que valores y donde los queremos guardar
          setValue('title', task.title)
          setValue('description', task.description)
          setValue(
            "date",
            task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    }
    //ejecuto funcion
    loadTask()
  }, []); 
  
  //para mostrar la fecha
  const onSubmit = handleSubmit((data) =>{

    try {
      const dataValid = {
        ...data,
        date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
      }

      if (params.id) {
        updateTask(params.id, dataValid);
      } else {
        createTask(dataValid);
      }
      navigate("/tasks");
    } catch (error) {
      console.log(error);
      
    }
  })
  
  return(
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label className="text-2xl font-bold" htmlFor="title">Title</label>
          <input 
            type="text"  
            placeholder="Title" 
            {...register('title')} 
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label className="text-2xl font-bold" htmlFor="description">Description</label>
          <textarea  
            rows="3" 
            {...register('description')} 
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          >   
          </textarea>
          <label className="text-2xl font-bold" htmlFor="date">Date</label>
          <input 
            type="date"
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <ul className="flex justify-between my-3">
            <li>
              <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
            </li>
            <li>
              <Link to={
                      isAuthenticated ? "/Tasks" : "/"
                  }>
                      <button className="bg-yellow-700 px-3 py-2  rounded-md">Return</button>
              </Link>
            </li>
          </ul>
         
          
        </form>
      </div>
    </div>
    
  )
}

export default TaskFormPage
