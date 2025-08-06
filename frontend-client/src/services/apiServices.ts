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

export type RegisterResponse = {

}

