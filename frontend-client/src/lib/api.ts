
import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
    headers : {
        "Content-Type" : "application/json",
    },
    timeout: 10000,
    withCredentials: true // essential to send cookies in req
})

// api.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem("accessToken"); // Adjust key as needed
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

api.interceptors.response.use(
    r => r,
    err => {
        return Promise.reject(err.response?.data ?? { message: err.message });
    }
)


export default api