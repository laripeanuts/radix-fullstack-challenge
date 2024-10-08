import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z
    .string({
      message: 'Password field is required',
    })
    .email({ message: 'Invalid e-mail' }),
  password: z
    .string({
      message: 'Password field is required',
    })
    .min(6, { message: 'A password must have at least 6 characters' }),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
