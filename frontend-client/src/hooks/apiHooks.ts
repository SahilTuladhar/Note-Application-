import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  completeNoteService,
  createNoteService,
  getUserRecordService,
  incompleteNoteService,
  loginUserService,
  logoutUserService,
  registerUserService,
} from "@/services/apiServices";
import { toast } from "sonner";
import type {
  GetUserResponse,
  GetUserResponseType,
  RegisterPayload,
  RegisterResponse,
} from "@/services/apiServices";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUserService,

    onSuccess: (data) => {
      toast.success("Account Sucessfully Created");
      console.log("Sucessful Response", data);

      // On success go to login page

      navigate("/login-page");
    },

    onError: (error: Error) => {
      toast.error(error.message);
      console.log("ERR", error);
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUserService,

    onSuccess: (data) => {
      toast.success("Logged in Successfully");
      console.log("Successful Log:", data);

      navigate("/home-page");
    },

    onError: (error: Error) => {
      toast.error(error.message);
      console.log("ERR", error);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserService,

    onSuccess: () => {
      toast.success("Logged out Successfully");

      navigate("/login-page");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useGetRecords = () => {
  return useQuery({
    queryKey: ["records"],
    queryFn: getUserRecordService,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNoteService,

    onSuccess: (data) => {
      toast.success("Note created Successfully");
      console.log(data);

      queryClient.invalidateQueries({ queryKey: ["records"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useCompleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeNoteService,

    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({ queryKey: ["records"] });

      queryClient.setQueryData<GetUserResponse>(["records"], (oldData) => {
        console.log(oldData);

        if (!oldData) return oldData;

        console.log(oldData);

        return {
          ...oldData,
          data: {
            ...oldData.data,
            notes: oldData.data.notes.map((note) =>
              note.note_id === variables.note_id
                ? {
                    ...note,
                    is_completed: 1,
                  }
                : note
            ),
          },
        };
      });

      toast.success("Note successfully marked as complete");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useIncompletNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incompleteNoteService,

    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({ queryKey: ["records"] });

      queryClient.setQueryData<GetUserResponse>(["records"] , (oldData) =>{
       
        if(!oldData) return oldData;

        return {
          ...oldData,
          data:{
            ...oldData.data,
            notes: oldData.data.notes.map((note) => 
            note.note_id === variables.note_id 
          ? {...note , is_completed : 0}
          : note )
          }
        }


      })

      toast.success("Note successfully marked as incomplete");
    },

    onError: (err) => {
      toast.error(err.message);
    },
    
  });
};
