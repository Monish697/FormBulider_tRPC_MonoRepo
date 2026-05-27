"use client";

import React from "react";
import { trpc } from "~/trpc/client";
import { toast } from "sonner";
import { FormViewer } from "~/components/form-builder/FormViewer";

export default function PublicFormClient({ form }: { form: any }) {
  const submitMutation = trpc.formSubmission.create.useMutation();


  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (responses: Record<string, any>) => {
    submitMutation.mutate(
      {
        formId: form.id,
        responses,
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err) => toast.error("Failed to submit: " + err.message)
      }
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center font-sans text-slate-900">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-md w-full border border-slate-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-slate-500">Your response has been successfully submitted.</p>
        </div>
      </div>
    );
  }

  return (
    <FormViewer 
      initialElements={form.elements}
      initialThemeProps={{
        companyName: form.title,
        // Since design properties aren't in the DB yet, we just pass defaults
        theme: "default",
        appTheme: "light"
      }}
      onSubmit={handleSubmit}
      isSubmitting={submitMutation.isPending}
    />
  );
}
