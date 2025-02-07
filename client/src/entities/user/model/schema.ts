import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: z.enum(['admin', 'operator']),
});

export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export const loginFormSchema = z.object({
  username: z.string().min(3), 
  password: z.string().min(6),
});
