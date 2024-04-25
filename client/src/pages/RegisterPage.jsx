//importo propiedades de react, modulos y mi funcion para autenticacion
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


//funcion para registro
function RegisterPage() {
    //desde la funcion useAuth traigo funciones  
    const {signup, isAuthenticated, errors: registerErrors} = useAuth()
    
    //paso las cosas que necesitare para el funcionamiento del registro
    const {
        //paso un register que sirver para registrar inputs
        register, 
        //utilizo el evento de useForm para decir que quiero que se guarde cuando se ejecuta
        handleSubmit,
        formState:{errors},
    //utilizo useForm del modulo react-hook-form para crear formulario
    } = useForm()

    const navigate = useNavigate()


    //utilizo guardo en esta variale lo que se tiene que ejecutar cuando guarde "la variable esta en el onSubmit del formulario"
    const onSubmit = handleSubmit( async (values) =>{
        //le paso los valores a la funcion singup para que se logee
        signup(values)
     })
     //si se logea correctamente dirije directamente a las tareas para no tener que pasar otra vez por el login
     useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])

    //el formulario para el registro 
    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2" key={i}>
                        {error}
                    </div>
                ))
            }
             <h1 className="text-3xl font-bold my-2">Register</h1>
            <form onSubmit={onSubmit}>
                <input type="text" {...register("username", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md  my-2" placeholder="username" />
                {
                   errors.username && <p className="text-red-500">Username is required</p> 
                }

                <input type="email"  {...register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"/>
                {
                   errors.email && <p className="text-red-500">Email is required</p> 
                }

                <input type="password"  {...register("password", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password"/>
                {
                   errors.password && <p className="text-red-500">Password is required</p> 
                }

                <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-md my-2">Register</button>
            </form>

            <p className="flex gap-x-2 justify-between">
                Already have account? <Link to="/login" className="text-sky-500">Login</Link>
            </p>
            </div>  
        </div>
    )
}
//exporto mi funcion para el registro 
export default RegisterPage