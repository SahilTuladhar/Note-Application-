import ModalCard from "../components/modalCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/authSchema";
import type { LoginFormInputs, SignUpInputs } from "../schemas/authSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const RegisterPage = () => {
  const form = useForm<SignUpInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data", data);
  };

  return (
    <div
      className=" w-screen h-screen flex items-center justify-center
        border border-green-500 "
    >
      <ModalCard>
        <h1 className="text-body-lg">Sign Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col justify-center !p-2 !w-full gap-5
            "
          >
            <div className="flex justify-center !w-full gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem
                  className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="!p-2"
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                  className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="!p-2"
                        type="email"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="!p-2"
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="!p-2"
                      type="password"
                      placeholder="Re-enter password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>


        <Button
        type="submit"
        className="btn-primary w-full"> 
            Log In
        </Button>
        </Form>
      </ModalCard>
    </div>
  );
};

export default RegisterPage;
