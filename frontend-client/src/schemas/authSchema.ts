import { z } from "zod";


export const loginSchema = z.object({
  email: z.string().email("Invalid Email"),

  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
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

export const NoteFormSchema = z.object({
  title: z
  .string()
  .min(1 , "Title is required"),

  content: z
  .string()
  .min(1 , "Content is required")
  .max(100 , "Content should not be more than 100 characters")
  .optional(),

  category:z
  .enum(["Personal", "Work" , "Todo"])
})

export type NoteFormInputs = z.infer<typeof NoteFormSchema>
