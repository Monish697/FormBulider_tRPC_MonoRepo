import { trpc } from "~/trpc/client";

export function useSignup() {
  const {
    mutate: createUserWithEmailAndPassword,
    mutateAsync: createUserWithEmailAndPasswordAsync,
    error,
    isError,
    isPending,
    isSuccess,
    isIdle,
    status,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation();
  return {
    mutate: createUserWithEmailAndPassword,
    mutateAsync: createUserWithEmailAndPasswordAsync,
    error,
    isError,
    isPending,
    isSuccess,
    isIdle,
    status,
  };
}
