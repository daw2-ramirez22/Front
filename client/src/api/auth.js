//importo axios desde mi ruta axios
import axios from "./axios";

//utilizo axios para hacer mis "promesas" para los usuarios
export const registerRequest = (user) => {
    return axios.post(`/register`, user);
  }
export const loginRequest = (user) => axios.post(`/login`, user)
export const vertyTokenRequet = () => axios.get(`/verify`)
