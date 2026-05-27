import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().describe("JWT secret"),
  SALT: z.string().describe("salt to hash the password"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) throw new Error(safeParseResult.error.message);
  return safeParseResult.data;
}

export const env = createEnv(process.env);
