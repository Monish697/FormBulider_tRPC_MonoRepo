import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
  firstName: z.string().describe("User First Name"),
  lastName: z.string().describe("User Last Name"),
  email: z.string().email().describe("User Email"),
  password: z.string().describe("User Password"),
});

export const createUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("ID of the user"),
});

export const loginWithEmailAndPasswordInputModel = z.object({
  email: z.string().email().describe("User Email"),
  password: z.string().describe("User Password"),
});

export const loginWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("ID of the user"),
});
