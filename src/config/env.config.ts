import * as dotenv from 'dotenv';
import { z } from 'zod';

// Cargar las variables de entorno desde un archivo .env
dotenv.config();

// Esquema de validación con Zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url(),
});

// Validar variables de entorno
const envVariables = envSchema.parse(process.env);

export default {
  nodeEnv: envVariables.NODE_ENV,
  port: Number(envVariables.PORT),
  databaseUrl: envVariables.DATABASE_URL,
};