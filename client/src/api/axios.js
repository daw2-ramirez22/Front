//importo axios desde la biblioteca de axios
import axios from "axios";

//creo la instancia base de todas las promesas luego la importare en axios en task y auth directamente desde aqui
const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true
})
//exportar instance
export default instance