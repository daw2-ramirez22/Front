//importo propiedades desde react
import { createContext, useState, useContext, useEffect } from "react";
//importo las funciones desde api/auth.js
import {
  registerRequest,
  loginRequest,
  vertyTokenRequet,
  logoutRequest,
} from "../api/auth.js";
//importo cookies desde js-cookie
import Cookies from "js-cookie";
//creo contexto y lo guardo en la variable
export const AuthContext = createContext();

//creo funcion para usar autenticacion
export const useAuth = () => {
  //uso el contexto con useContext pasandole como parametro la variable de creacion del contexto y lo guardo en una variable
  const context = useContext(AuthContext);
  //si el contexto falla me dara el error definido
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  //devuelvo el contexto
  return context;
};

// creo y exporto el provider
export const AuthProvider = ({ children }) => {
  //utilizo uState y paso el user que podre leer en toda la app
  const [user, setUser] = useState(null);

  //uso el estado isautenticated iniciado como false y set autenticated para introdcir si me he autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //useState para control de errores
  const [errors, setErrors] = useState([]);
  //para que la pagina carge y no se quede esperando por si tardara la respuesta
  const [loading, setLoading] = useState(true);
  //creo la funcion asincrona signup y va a recibir un usuario
  const signup = async (user) => {
    //try y catch para control de errores
    try {
      //guardo en una variable la peticion del registro pasandole como parametro un usuario
      const res = await registerRequest(user);
      //le paso los datos del usuario
      setUser(res.data);
      //si se ha registrado bien le pongo en true la autenticacion
      setIsAuthenticated(true);
    } catch (error) {
      //muestro los errores
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    //try y catch para control de errores
    try {
      //le paso el usuario a la peticion de login
      const res = await loginRequest(user);
      //le digo que si esta autenticado
      setIsAuthenticated(true);
      //seteo el usuario con los datos del usuario
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        //devuelvo una respuesta con los datos de error
        return setErrors(error.response.data);
      }
      //seteo los errores
      setErrors([error.response.data.message]);
    }
  };

  //creo effecto para el contol del mensaje de errores
  useEffect(() => {
    //si ha salido el error
    if (errors.length > 0) {
      //a los 5 segundos elimino el mensahe
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      //devuelvo el error vacic desde la variable creada "timer"
      return () => clearTimeout(timer);
    }
    //mando el error para mostrar en la pagina
  }, [errors]);

  //creo un effect para logear y chekear la cookie
  useEffect(() => {
    const checkLogin = async () => {
 
      //si hay token lo mando a autenticar 
      try {
        //enviao el token a autenticar 
        const res = await vertyTokenRequet();
        //si el token no coincide token
        if (!res.data) return setIsAuthenticated(false);
        //si es corecto
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        //si hay error
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  //creo funcion asincrona para deslogearme
  const logout = async() => {
    try {
      //elimino el token
      Cookies.remove("token");
      //llasmo logout
      await logoutRequest();
      //le digo que no esta autenticado
      setIsAuthenticated(false);
      //seteo el usuario a null
      setUser(null);

    } catch (error) {
      //seteo los errores
      setErrors([error.response.data.message]);
    }
  };

  //devuelvo el contexto con las funciones que he creado en esta pagina y propiedades
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
