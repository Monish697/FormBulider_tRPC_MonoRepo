"use client";

import React from "react";
import { trpc } from "~/trpc/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Copy } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const { data: forms, isLoading: formsLoading, isError: formsError } = trpc.form.getMyForms.useQuery();
  const { data: user, isLoading: userLoading, isError: userError } = trpc.auth.me.useQuery(undefined, {
    retry: false // Don't retry if user is not found
  });
  
  const createFormMutation = trpc.form.create.useMutation({
    onSuccess: (data) => {
      router.push(`/builder?id=${data.id}`);
    },
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      // Force a full page reload to clear any cached states
      window.location.href = "/";
    },
  });

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/f/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Form link copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  };

  const handleCreateForm = () => {
    createFormMutation.mutate({
      title: "My New Form",
      description: "A description for my new form",
    });
  };

  // If user is permanently errored out (e.g. valid token but user deleted from DB)
  if (userError) {
    return (
      <div className="p-8 max-w-xl mx-auto mt-20 text-center font-sans">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Session Invalidated</h2>
        <p className="text-slate-600 mb-8">It looks like your user account no longer exists or your session is invalid.</p>
        <button
          onClick={() => logoutMutation.mutate()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          {logoutMutation.isPending ? "Logging out..." : "Log Out & Return Home"}
        </button>
      </div>
    );
  }

  if (formsLoading || userLoading) return <div className="p-8 font-sans">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans text-slate-900">
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <div className="flex items-center text-slate-500 space-x-2">
            <User className="w-4 h-4" />
            <span>{user?.firstName} {user?.lastName} ({user?.email})</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="flex items-center text-slate-500 hover:text-red-600 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {logoutMutation.isPending ? "Logging out..." : "Log Out"}
          </button>
          <button
            onClick={handleCreateForm}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            disabled={createFormMutation.isPending}
          >
            {createFormMutation.isPending ? "Creating..." : "+ Create Form"}
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">My Forms</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms?.map((form) => (
          <div key={form.id} className="border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{form.title}</h2>
            <div className="flex flex-col gap-2 mb-4 flex-1">
              <p className="text-slate-500 text-sm">{form.description}</p>
              {form.visibility === 'private' && Array.isArray(form.allowedEmails) && form.allowedEmails.length > 0 && (
                <details className="text-xs text-slate-500 mt-2 group outline-none">
                  <summary className="font-medium cursor-pointer hover:text-indigo-600 transition-colors list-none flex items-center gap-1 select-none">
                    View Allowed Emails ({form.allowedEmails.length})
                    <span className="group-open:rotate-180 transition-transform text-[8px] ml-1">▼</span>
                  </summary>
                  <div className="mt-2 flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100 max-h-24 overflow-y-auto">
                    {(form.allowedEmails as string[]).map(email => (
                      <span key={email} className="bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded shadow-sm">{email}</span>
                    ))}
                  </div>
                </details>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              {form.visibility === 'private' ? (
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">Private</span>
              ) : form.status === 'draft' || form.visibility === 'unlisted' ? (
                <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 rounded-full">Draft</span>
              ) : (
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">Public</span>
              )}
              
              <div className="flex gap-3 items-center">
                <button 
                  onClick={() => handleCopyLink(form.slug)} 
                  title="Copy link to form"
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {form.status === 'published' && form.visibility !== 'unlisted' && (
                  <Link href={`/f/${form.slug}`} target="_blank" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View
                  </Link>
                )}
                <Link href={`/dashboard/responses/${form.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-800">
                  Responses
                </Link>
                <Link href={`/builder?id=${form.id}`} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
        {(!forms || forms.length === 0) && (
          <div className="col-span-full text-center py-16 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
            <p className="mb-4">No forms found.</p>
            <button
              onClick={handleCreateForm}
              className="text-indigo-600 font-medium hover:underline"
            >
              Create your first form
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
