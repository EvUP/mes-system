import type { z } from 'zod';
import type { authResponseSchema, loginFormSchema, userSchema } from "./schema";

export type UserT = z.infer<typeof userSchema>;
export type loginFormT = z.infer<typeof loginFormSchema>;
export type authResponseT = z.infer<typeof authResponseSchema>;

export type AuthSliceT = {
  user: UserT | null;
  accessToken: string | null;
  error: string | null;
};
