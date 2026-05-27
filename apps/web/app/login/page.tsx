"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const mutation = trpc.auth.loginWithEmailAndPassword.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f4f1] text-slate-900 dark:bg-black dark:text-white flex items-center justify-center p-6 font-sans">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#ffe9d6] blur-[140px] dark:hidden" />
      <div className="pointer-events-none absolute top-24 left-0 h-80 w-80 rounded-full bg-[#dfe8ff] blur-[150px] dark:hidden" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#e8fff0] blur-[150px] dark:hidden" />

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="text-center mb-10">
          <Link className="inline-flex items-center gap-3 mb-8" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white/70 dark:bg-black text-sm font-semibold shadow-sm">
              FC
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold tracking-tight">Formcraft</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-300">
                Studio
              </p>
            </div>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl text-slate-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-3 text-[15px] text-slate-600 dark:text-gray-300">
            Log in to continue to Formcraft Studio.
          </p>
        </div>

        <div className="rounded-[32px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-8 shadow-2xl shadow-black/5 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-300 pl-1">
                Work email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-black/10 dark:border-[#6FC3DF] bg-white dark:bg-black px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 transition shadow-sm"
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5 pt-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-300 pl-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full rounded-2xl border border-black/10 dark:border-[#6FC3DF] bg-white dark:bg-black px-4 py-3.5 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 transition shadow-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {mutation.error && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                {mutation.error.message}
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full rounded-full bg-slate-900 dark:bg-white dark:text-black py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:shadow-slate-900/30 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {mutation.isPending ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-slate-900 dark:text-white transition hover:text-slate-700 dark:text-gray-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
