import { z } from 'zod';

export const passwordSchema = z.string().min(8, {
  message: "The password must be at least 8 characters long",
});

export const emailSchema = z
  .string()
  .email({ message: "The email is not valid!" });

export const nameSchema = z
  .string()
  .min(1, { message: "The name must not be empty!" });

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});