import { z } from "zod";

export const createUserWithEmailAndPassword = z.object({
  firstName: z.string().describe("User First Name"),
  lastName: z.string().describe("User Last Name"),
  email: z.string().email().describe("User's Email"),
  password: z.string().describe("Password"),
});

export type createUserWithEmailAndPasswordType = z.infer<typeof createUserWithEmailAndPassword>;

export const generateUserTokenPayload = z.object({
  id: z.string().describe("user id to generate JWT token"),
});

export type generateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>;

export const loginWithEmailAndPassword = z.object({
  email: z.string().email().describe("User's Email"),
  password: z.string().describe("Password"),
});

export type loginWithEmailAndPasswordType = z.infer<typeof loginWithEmailAndPassword>;
