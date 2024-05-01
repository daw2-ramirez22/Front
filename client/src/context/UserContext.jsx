import { createContext, useContext, useState } from "react";
import { deleteUserRequest, getAllUsersRequest } from "../api/users";

//creo el contexto de las tareas
const UserContext = createContext();

export const useUser = () => {
  //creo el contexto
  const context = useContext(UserContext);
  //si el contexto falla me dara el error definido
  if (!context) throw new Error("useUsersmust be used within a UsersProvider");
  //devuelvo el contexto
  return context;
};

//creo y exporto el provider para las tareas
export function UserProvider({ children }) {
  // const [user, setUser] = useState([]);
  const [users, setAllUsers] = useState([]);

  //creo funcon para pedir tareas


  const getAllUsers = async () => {
    try {
      //peticion al back
      const res = await getAllUsersRequest();
      //devuelvo laos datos de la tarea
      setAllUsers(res.data);
      return res.data;
    } catch (error) {
      //muestro error en caso que tenga
      console.error(error);
    }
  };
  //creo funcion para borrar tareas
  const deleteUser = async (id) => {
    try {
      //peticion al back
      const res = await deleteUserRequest(id);
      console.log(res)
      //si falla decuelvo el estado 204
      console.log(id)
      //devuelvo el nuevoe stado de los usuarios
      if (res.status === 204) setAllUsers((prevAllUsers) => prevAllUsers.filter((user) => user._id !== id));


    } catch (error) {
      //muestro error en caso que tenga
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        getAllUsers,
        users,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
