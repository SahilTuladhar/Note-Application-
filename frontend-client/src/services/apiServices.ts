import api from "@/lib/api";

type ApiResponse<T> = {
    statusCode: number,
    data: T,
    message: string,
    success: boolean
}

export type RegisterPayload = {
    username: string,
    email: string,
    password: string
}

export type LoginPayload = {
    email: string,
    password: string
}

export type LoginResponseType = {
    user_id: number,
    username: string,
    email:string,
    password:string
}



export type RegisterResponse = ApiResponse<number>
export type LoginResponse = ApiResponse<LoginResponseType>

// functions that make call to API endpoints

export const registerUser = async(data : RegisterPayload) : Promise<RegisterResponse>=> {

    const res = await api.post<RegisterResponse>("/users/register" , data)

    if(res.status !== 200 && res.status !== 201){
        throw new Error("Failed Sign In Attempt")
    }

    return res.data

}

export const loginUser = async(data : LoginPayload ) : Promise<LoginResponse> => {
  
     const res = await api.post<LoginResponse>("/users/login-user" , data)

     if(res.status !== 200){
        throw new Error("Failed Log in attempt")
     }

     return res.data
}

