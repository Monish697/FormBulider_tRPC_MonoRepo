"use client";

import React from "react";
import { trpc } from "~/trpc/client";
import Link from "next/link";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function LiveFormsPage() {
  const { data: forms, isLoading, error } = trpc.form.getPublicForms.useQuery();

  return (
    <div className="min-h-screen bg-[#f6f4f1] dark:bg-black font-sans text-slate-900 dark:text-white transition-colors">
      <header className="relative z-10 border-b border-black/10 dark:border-white/20 bg-white/50 dark:bg-black backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white/70 dark:bg-black text-sm font-semibold">
              FC
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">Formcraft</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-300">Live</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/" className="text-sm font-medium hover:underline text-slate-600 dark:text-gray-300">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Live Forms Directory</h1>
          <p className="text-lg text-slate-600 dark:text-gray-400">
            Browse and fill out publicly available forms created by the Formcraft community.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-slate-500">Loading live forms...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">Failed to load live forms.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms?.map((form) => (
              <Link 
                href={`/f/${form.slug}`} 
                key={form.id}
                className="group block rounded-2xl border border-black/10 dark:border-white/20 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{form.title}</h2>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Public
                  </span>
                </div>
                <p className="text-slate-500 dark:text-gray-400 text-sm line-clamp-2">
                  {form.description || "No description provided."}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-slate-400 dark:text-gray-500">
                  <span>Created {new Date(form.createdAt || Date.now()).toLocaleDateString()}</span>
                  <span className="font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Fill out form →
                  </span>
                </div>
              </Link>
            ))}
            
            {(!forms || forms.length === 0) && (
              <div className="col-span-full text-center py-24 border-2 border-dashed border-black/10 dark:border-white/20 rounded-3xl text-slate-500">
                <p className="text-lg font-medium mb-2">No public forms yet</p>
                <p>Be the first to create and publish a public form!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
