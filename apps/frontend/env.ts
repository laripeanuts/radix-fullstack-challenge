import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development').optional(),
  BASE_FRONTEND_URL: z.string().default('http://localhost:3001').optional(),
  FRONTEND_PORT: z.string().default('3001').optional(),
  BASE_BACKEND_URL: z.string().default('http://localhost:3000').optional(),
  BACKEND_PORT: z.string().default('3000').optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
