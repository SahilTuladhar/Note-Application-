
import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
    headers : {
        "Content-Type" : "application/json",
    },
    timeout: 10000
})

api.interceptors.response.use(
    r => r,
    err => {
        return Promise.reject(err.response?.data ?? { message: err.message });
    }
)


export default api