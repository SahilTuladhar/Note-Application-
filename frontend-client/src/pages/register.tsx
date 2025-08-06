import ModalCard from "../components/modalCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/authSchema";
import type { SignUpInputs } from "../schemas/authSchema";
import {toast} from "sonner"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "@/hooks/apiHooks";

const RegisterPage = () => {
  const form = useForm<SignUpInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const {mutate} = useRegister();

  const onSubmit = (data: SignUpInputs) => {
    console.log("Register Data", data);
     
    mutate({
      username: data.username,
      email: data.email,
      password:data.password
    })


    form.reset()
  };

  return (
    <div className=" w-screen h-screen flex items-center justify-center font-sans">
      <ModalCard>
        <h1 className="text-body-lg font-sans">Sign Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit , (errors) => {

                const firstError = Object.values(errors)[0];

                if(firstError?.message){
                  toast.error(firstError.message.toString())
                }

            } )}
            className=" flex flex-col justify-center !p-2 !w-full gap-5
            "
          >
            <div className="flex justify-center !w-full gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="!border-0 border-b-2 border-blue-200 !rounded-none !p-2 focus:border-b-2 focus:border-primary focus:outline-none"
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input
                        className="!border-0 border-b-2 border-blue-200 !rounded-none !p-2 focus:border-b-2 focus:border-primary focus:outline-none"
                        type="email"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Password</FormLabel> */}
                  <FormControl>
                    <Input
                      className="!border-0 border-b-2 border-blue-200 !rounded-none !p-2 focus:border-b-2 focus:border-primary focus:outline-none"
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Confirm Password</FormLabel> */}
                  <FormControl>
                    <Input
                      className="!border-0 border-b-2 border-blue-200 !rounded-none !p-2 focus:border-b-2 focus:border-primary focus:outline-none"
                      type="password"
                      placeholder="Re-enter password"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <Button type="submit" className="btn-primary w-full">
            Sign In
          </Button>
          </form>

          
        </Form>
        <p className="text-body-sm">
          Already Have an Account?
          <a
          className="hover:opacity-80" 
           href="/login-page">  Log In</a>
        </p>
      </ModalCard>
    </div>
  );
};

export default RegisterPage;
