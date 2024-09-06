import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  FRONTEND_PORT: z.coerce.number().optional().default(3001),
  BACKEND_PORT: z.coerce.number().optional().default(3000),
  BASE_BACKEND_URL: z.string(),
  BASE_FRONTEND_URL: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
