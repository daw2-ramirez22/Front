import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
//creo una funcion para protejer rutas si no estas logeado
function ProtectedRoute() {
    //uso mi funcion auth y le paso el estado de carga y el metodo de isauth
    const {loading , isAuthenticated} = useAuth()

    //si no esta autenticado esta cargando 
    if(loading) return <h1>loading ...</h1>
    //si no esta autenticado y esta cargando mandalo al login de vuelta
    if(!loading && !isAuthenticated) return <Navigate to='/login'></Navigate>
    //si esta logeado devuelvo la etiqueta outlet que quiere decir donde estaba 
    return (
        <Outlet></Outlet>
    )
}
//exporto la funcion
export default ProtectedRoute