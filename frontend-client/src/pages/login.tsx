import ModalCard from "../components/modalCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchema";
import type { LoginFormInputs } from "../schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/hooks/apiHooks";

const LoginPage = () => {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {mutate} = useLogin()

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data", data);
    
    mutate({
      email: data.email,
      password: data.password
    })


    form.reset();
  };

  return (
    <div className=" w-screen h-screen flex items-center justify-center font-sans">
      <ModalCard>
        <p className="text-heading-sm !font-normal"><span className="text-green-600 font-bold">Leap</span>Notes</p>
        <h1 className="text-body-lg font-sans">Log In</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              const firstError = Object.values(errors)[0];

              if (firstError?.message) {
                toast.error(firstError.message.toString());
              }
            })}
            className=" flex flex-col justify-center !p-2 !w-full gap-5
            "
          >
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

            <Button type="submit" className="btn-primary w-full">
              Log In
            </Button>
          </form>
        </Form>

        <p className="text-body-sm">
          Create new Account.{" "}
          <a className="hover:opacity-80" href="/">
            Sign In
          </a>
        </p>
      </ModalCard>
    </div>
  );
};

export default LoginPage;
