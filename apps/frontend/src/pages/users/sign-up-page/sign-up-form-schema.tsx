import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string({
    message: 'Name field is required',
  }),
  email: z
    .string({
      message: 'E-mail field is required',
    })
    .email({ message: 'Invalid e-mail' }),
  password: z
    .string({
      message: 'Password field is required',
    })
    .min(6, { message: 'A password must have at least 6 characters' }),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
