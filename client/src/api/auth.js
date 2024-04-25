//importo axios desde mi ruta axios
import axios from "./axios";

//utilizo axios para hacer mis "promesas" para los usuarios
export const registerRequest = (user) => {
    document.cookies()
    console.log(document.cookies)
    return axios.post(`/register`, user, {
    //   headers: {
    //     'Cookie': cookies // Asegúrate de tener los cookies en el formato adecuado
    //   }
    });
  }
export const loginRequest = (user) => axios.post(`/login`, user)
export const vertyTokenRequet = () => axios.get(`/verify`)
