import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  completeNoteService,
  createNoteService,
  deleteNoteService,
  getUserRecordService,
  incompleteNoteService,
  loginUserService,
  logoutUserService,
  registerUserService,
  updateNoteService,
} from "@/services/apiServices";
import { toast } from "sonner";
import type {
  GetUserResponse,
  GetUserResponseType,
  RegisterPayload,
  RegisterResponse,
} from "@/services/apiServices";
import { useNavigate } from "react-router-dom";
import { string } from "zod";

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

      navigate("/landing-page");
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


export const useGetRecords = (category : string , page:number , limit: number) => {
  return useQuery({
    queryKey: ["records" , category , page , limit],
    queryFn: () =>  getUserRecordService(category , page , limit),
    placeholderData: (prevData) => prevData


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

export const useCompleteNote = (selected_category: string , page:number , limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeNoteService,

    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({ queryKey: ["records" , selected_category , page , limit ]   });

      queryClient.setQueryData<GetUserResponse>(["records" , selected_category ,  page , limit], (oldData) => {
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

export const useIncompletNote = (selected_category: string, page:number , limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incompleteNoteService,

    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({ queryKey: ["records" , selected_category, page , limit] });

      queryClient.setQueryData<GetUserResponse>(["records" , selected_category, page , limit] , (oldData) =>{
       
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

export const useDeleteNote = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNoteService,

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : ["records"]})
      toast.success("Note successfully deleted");
      
    },

    onError: (err) => {
      toast.error(err.message)
    }
  })
 
}

export const useUpdateNote = () => {
  
  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: updateNoteService,

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : ["records"]})
      toast.success("Note successfully updated");
    },

    onError:(err) => {
      toast.error(err.message)
    }

  })

}
