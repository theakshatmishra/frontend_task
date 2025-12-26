import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const taskSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(200, { message: "Title must be less than 200 characters" }),
  description: z.string().max(1000, { message: "Description must be less than 1000 characters" }).optional(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.string().optional().nullable(),
});

export const profileSchema = z.object({
  full_name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }).optional(),
  bio: z.string().max(500, { message: "Bio must be less than 500 characters" }).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
