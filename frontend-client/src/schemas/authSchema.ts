import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid Email"),

  password: z
    .string()
    .min(8, "Password must be atleast 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema
  .extend({
    username: z.string().min(1, "Username is required"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInputs = z.infer<typeof signupSchema>;
