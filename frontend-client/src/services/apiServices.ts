import type { Category } from "@/components/FormCard";
import api from "@/lib/api";
import { any } from "zod";

type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type NotePayload = {
  title: string;
  content: string;
  categories: Category[];
};

export type CompleteNotePayload = {
  note_id: number;
};

export type IncompleteNotePayload = {
  note_id: number;
};

export type DeleteNotePayload = {
  note_id: number;
};

export type UpdateNotePayload = {
  note_id: number;
  title: string;
  categories: Category[];
  content: string;
};

export type LoginResponseType = {
  user_id: number;
  username: string;
  email: string;
  password: string;
};

export type NoteResponseType = {
  note_id: number;
  user_id: number;
  title: string;
  content: string;
  categories: Category[];
  created_at: string;
  updated_at?: string;
  is_completed: number;
};

export type GetUserResponseType = {
  username: string;
  notes: NoteResponseType[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export type CompeleteNoteResponseType = {
  notes_affected: number;
  note_id: number;
};

export type IncompeleteNoteResponseType = {
  notes_affected: number;
  note_id: number;
};

export type DeleteNoteResponseType = {
  notes_affected: number;
  note_id: number;
};

export type UpdateNoteResponseType = {
  notes_affected: number;
  note_id: number;
};

export type RegisterResponse = ApiResponse<number>;
export type LoginResponse = ApiResponse<LoginResponseType>;
export type LogoutResponse = ApiResponse<void>;
export type GetUserResponse = ApiResponse<GetUserResponseType>;
export type CreateNoteResponse = ApiResponse<number>;
export type CompleteNoteResponse = ApiResponse<CompeleteNoteResponseType>;
export type IncompleteNoteResponse = ApiResponse<IncompeleteNoteResponseType>;
export type DeleteNoteResponse = ApiResponse<DeleteNoteResponseType>;
export type UpdateNoteResponse = ApiResponse<UpdateNoteResponseType>;

// functions that make call to API endpoints

export const registerUserService = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const res = await api.post<RegisterResponse>("/users/register", data);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed Sign Up Attempt");
    }

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed Sign Up Attempt");
  }
};

export const loginUserService = async (
  data: LoginPayload
): Promise<LoginResponse> => {
  try {
    const res = await api.post<LoginResponse>("/users/login-user", data);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed Log in attempt");
  }
};

export const logoutUserService = async (): Promise<LogoutResponse> => {
  try {
    const res = await api.post<LogoutResponse>("/users/logout-user");

    if (res.status !== 200) {
      throw new Error("Failed To Log Out");
    }

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed To Log Out");
  }
};

export const getUserRecordService = async (
  category: string,
  page: number,
  limit: number
): Promise<GetUserResponse> => {
  try {
    const params = new URLSearchParams();

    if (category !== "All") {
      params.append("category", category);
    }

    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const res = await api.get<GetUserResponse>(
      `/users/home-page?${params.toString()}`
    );

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to fetch user records");
  }
};
export const createNoteService = async (
  data: NotePayload
): Promise<CreateNoteResponse> => {
  try {
    const res = await api.post<CreateNoteResponse>("/notes/create-note", data);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to Create Note");
    }

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to Create Note");
  }
};

export const completeNoteService = async (
  data: CompleteNotePayload
): Promise<CompleteNoteResponse> => {
  try {
    const res = await api.patch<CompleteNoteResponse>(
      "/notes/complete-note",
      data
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const incompleteNoteService = async (
  data: IncompleteNotePayload
): Promise<IncompleteNoteResponse> => {
  try {
    const res = await api.patch<IncompleteNoteResponse>(
      "/notes/incomplete-note",
      data
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteNoteService = async (
  data: DeleteNotePayload
): Promise<DeleteNoteResponse> => {
  try {
    const res = await api.delete("/notes/delete-note", { data });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateNoteService = async (
  data: UpdateNotePayload
): Promise<UpdateNoteResponse> => {
  try {
    const res = await api.patch("/notes/update-note", data);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
