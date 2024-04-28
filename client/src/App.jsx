//importacion de metodos desde react-router-dom y desde otras paginas mias
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TasksContext.jsx";
//importacion de mis paginas de la ruta page
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

//creo la funcion App para que cree las rutas desde el front que he creado en las paginas dentro de client/pages
function App() {
    //devuelvo todos los componentes 
    return (
       <AuthProvider>
            <TaskProvider>
                <BrowserRouter>
                    <main className="container mx-auto px-10">
                        <Navbar/>
                            <Routes>
                                <Route path="/" element={<HomePage></HomePage>}></Route>
                                <Route path="/login" element={<LoginPage></LoginPage>}></Route>
                                <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>  
                                <Route element={<ProtectedRoute></ProtectedRoute>}>
                                    <Route path="/tasks" element={<TasksPage></TasksPage>}></Route>
                                    <Route path="/add-task" element={<TaskFormPage></TaskFormPage>}></Route>
                                    <Route path="/task/:id" element={<TaskFormPage></TaskFormPage>}></Route>
                                    <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
                                </Route>
                            </Routes>
                    </main>
                </BrowserRouter>
            </TaskProvider>
       </AuthProvider>
    )
}
//exporto la funcion App
export default App