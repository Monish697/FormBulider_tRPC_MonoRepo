"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { trpc } from "~/trpc/client";
import { ArrowLeft, Inbox } from "lucide-react";

export default function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: form, isLoading: isFormLoading } = trpc.form.getById.useQuery({ id });
  const { data: submissions, isLoading: isSubmissionsLoading } = trpc.formSubmission.getByFormId.useQuery({ formId: id });

  if (isFormLoading || isSubmissionsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-500 font-medium">Loading responses...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <p className="text-red-500 font-medium">Form not found or you don't have access.</p>
      </div>
    );
  }

  // Ensure elements are available to map IDs to Labels
  const elements = Array.isArray(form.elements) ? form.elements : [];

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans text-slate-900">
      <button onClick={() => router.push('/dashboard')} className="flex items-center text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Responses: {form.title}</h1>
        <p className="text-slate-500">{submissions?.length || 0} total submissions</p>
      </div>

      {!submissions || submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Inbox className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-700">No responses yet</h3>
          <p className="text-slate-500 text-sm max-w-md text-center mt-2">
            Share your form link to start collecting responses. Submissions will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4">Submitted At</th>
                <th scope="col" className="px-6 py-4">Respondent Email</th>
                {elements.map((el: any) => (
                  <th key={el.id} scope="col" className="px-6 py-4 truncate max-w-[200px]" title={el.label}>
                    {el.label || el.type}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub: any) => (
                <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">
                    {new Date(sub.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {sub.respondentEmail || <span className="text-slate-400 italic">Anonymous</span>}
                  </td>
                  {elements.map((el: any) => {
                    const responseValue = sub.responses?.[el.id];
                    let displayValue = responseValue;
                    if (Array.isArray(responseValue)) {
                      displayValue = responseValue.join(", ");
                    }
                    return (
                      <td key={el.id} className="px-6 py-4 max-w-[300px] truncate" title={displayValue?.toString()}>
                        {displayValue !== undefined && displayValue !== null ? displayValue.toString() : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
