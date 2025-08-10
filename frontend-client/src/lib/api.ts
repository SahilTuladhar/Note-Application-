
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
    // err => {
    //     return Promise.reject(err.response?.data ?? { message: err.message });
    // }

    async(err) => {
      
        const originalRequest = err.config

        if(err.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true

            try{
                await api.post("/refresh-token")
                return api(originalRequest)
            } catch(refreshError){
                console.error(refreshError)
                window.location.href = "/login"
            }

            return Promise.reject(err)


        }
        
    }


)


export default api