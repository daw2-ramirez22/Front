//importo propiedades de react, modulos y mi funcion para autenticacion
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

//guncion para la pagina de login 
function LoginPage() {
    //paso las cosas que necesitare para el funcionamiento del login
    const {
        //paso un register que sirver para registrar inputs
        register, 
        //utilizo el evento de useForm para decir que quiero que se guarde cuando se ejecuta
        handleSubmit,
        formState: {errors},
    //utilizo useForm del modulo react-hook-form para crear formulario
    } = useForm()

    //desde la funcion useAuth traigo funciones  
    const {signin, errors: signinErrors, isAuthenticated} = useAuth()
    
    const navigate = useNavigate()
    //utilizo guardo en esta variale lo que se tiene que ejecutar cuando guarde "la variable esta en el onSubmit del formulario"
    const onSubmit = handleSubmit((data) => {
        //le paso los valores a la funcion singup para que se logee
        signin(data)
    })
    // effect para que si estoy autenticado para que si me logeo me envie a mis tareas 
    useEffect(() => {
        if (isAuthenticated) {
          navigate("/tasks");
        }
    }, [isAuthenticated]);

    //devuelvo el formulario con toda la info para poder logear el usuario
    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

            {
                signinErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-center my-2" key={i}>
                        {error}
                    </div>
                ))
            }
                
                <h1 className="text-3xl font-bold my-2">Login</h1>
                
                <form onSubmit={onSubmit}>
                    <input type="email"  {...register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"/>
                    {
                    errors.email && <p className="text-red-500">Email is required</p> 
                    }
                    <input type="password"  {...register("password", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password"/>
                    {
                    errors.password && <p className="text-red-500">Password is required</p> 
                    }

                    <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-md my-2">Login</button>
                </form>

                <p className="flex gap-x-2 justify-between">
                    Don't have accout? <Link to="/register" className="text-sky-500">Sing up</Link>
                </p>
            </div>
             
        </div>
    )
}
export default LoginPage