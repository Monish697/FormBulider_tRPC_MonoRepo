import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { createContext } from "./context";

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

import JWT from "jsonwebtoken";

const isAuthed = tRPCContext.middleware(({ next, ctx }) => {
  const token = ctx.getCookie("authToken");
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string);
    return next({
      ctx: {
        ...ctx,
        user: { id: typeof decoded === "string" ? decoded : (decoded as any).id },
      },
    });
  } catch (error) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export const protectedProcedure = tRPCContext.procedure.use(isAuthed);
