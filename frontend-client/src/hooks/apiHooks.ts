import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/services/apiServices";
import { toast } from "sonner";
import type { RegisterPayload, RegisterResponse } from "@/services/apiServices";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      toast.success("Account Sucessfully Created");
      console.log("Sucessful Response", data);

      // On success go to login page

      navigate("/login-page");
    },

    onError: (error: Error) => {
      toast.error("Failed to Create Account");
      console.log("ERR", error);
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success("Logged in Successfully");
      console.log("Successful Log:", data);

      navigate("/home-page");
    },

    onError: (error: Error) => {
      toast.error("Login Failed");
      console.log("ERR", error);
    },
  });
};
