import { publicProcedure, protectedProcedure, router } from "../../trpc";

import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  loginWithEmailAndPasswordInputModel,
  loginWithEmailAndPasswordOutputModel,
} from "./model";

import { generatePath } from "../../utils/path-generator";
import process from "node:process";

import { userService } from "../../services";

const getPath = generatePath("/authentication");
const TAGS = ["Authentication"];

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { firstName, lastName, email, password } = input;

      const { res, token } = await userService.createUserWithEmailAndPassword({
        firstName,
        lastName,
        email,
        password,
      });

      ctx.setCookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      let { id } = res;

      return {
        id,
      };
    }),
  loginWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/loginWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(loginWithEmailAndPasswordInputModel)
    .output(loginWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const { res, token } = await userService.loginWithEmailAndPassword({
        email,
        password,
      });

      ctx.setCookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      let { id } = res;

      return {
        id,
      };
    }),
  me: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await userService.getUserById(ctx.user!.id);
      if (!user) throw new Error("USER_NOT_FOUND");
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    }),
  logout: publicProcedure
    .mutation(async ({ ctx }) => {
      ctx.setCookie("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });
      return { success: true };
    }),
});
