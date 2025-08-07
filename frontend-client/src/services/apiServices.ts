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

export type GetUserResponseType = {
    username: string,
}


export type RegisterResponse = ApiResponse<number>
export type LoginResponse = ApiResponse<LoginResponseType>
export type LogoutResponse = ApiResponse<void>
export type GetUserResponse = ApiResponse<GetUserResponseType>

// functions that make call to API endpoints

export const registerUserService = async(data : RegisterPayload) : Promise<RegisterResponse>=> {

    const res = await api.post<RegisterResponse>("/users/register" , data)

    if(res.status !== 200 && res.status !== 201){
        throw new Error("Failed Sign In Attempt")
    }

    return res.data

}

export const loginUserService = async(data : LoginPayload ) : Promise<LoginResponse> => {
  
     const res = await api.post<LoginResponse>("/users/login-user" , data)

     if(res.status !== 200){
        throw new Error("Failed Log in attempt")
     }

     return res.data
}

export const logoutUserService = async() : Promise<LogoutResponse> => {

    const res = await api.post<LogoutResponse>("/users/logout-user")

    if(res.status !== 200){
        throw new Error("Failed To Log Out")
    }

    return res.data

}

export const getUserRecordService = async():Promise<GetUserResponse> => {

    const res = await api.get<GetUserResponse>("/users/home-page")

    return res.data

} 

