import { useMutation,useQuery ,useQueryClient } from "@tanstack/react-query";
import { getUserRecordService, loginUserService, logoutUserService, registerUserService } from "@/services/apiServices";
import { toast } from "sonner";
import type { RegisterPayload, RegisterResponse } from "@/services/apiServices";
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
   
  const navigate = useNavigate()

  return useMutation({
   
    mutationFn: logoutUserService,

    onSuccess: () => {
      toast.success("Logged out Successfully");

      navigate("/login-page");
    },

    onError: (error : Error) => {
      toast.error(error.message)
    }

  })

}

export const useGetRecords = () => {

   return useQuery({
    queryKey: ["records"],
    queryFn: getUserRecordService,

   })
}