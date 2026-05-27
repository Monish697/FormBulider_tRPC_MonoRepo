import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { usersTable } from "@repo/database/models/user";
import PublicFormClient from "./PublicFormClient";
import JWT from "jsonwebtoken";
import { env } from "../../../env";

export const dynamic = "force-dynamic";

export default async function PublicFormPage(props: { params: Promise<{ slug: string }> }) {
  const slug = (await props.params).slug;
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  // 1. Fetch Form
  const form = await db
    .select()
    .from(formsTable)
    .where(eq(formsTable.slug, slug))
    .then((res) => res[0]);

  if (!form) {
    return (
      <div className="p-8 text-center text-red-500 font-sans">
        Form not found or an error occurred.
      </div>
    );
  }

  // 2. Access Control Logic
  if (form.status === "draft" || form.visibility === "unlisted") {
    return (
      <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center font-sans">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-md w-full border border-slate-100">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            !
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Form Unavailable</h2>
          <p className="text-slate-500">
            This form is currently in draft mode and cannot accept submissions.
          </p>
        </div>
      </div>
    );
  }

  if (form.visibility === "private") {
    if (!token) {
      redirect("/login");
    }

    try {
      const decoded = JWT.verify(token, env.JWT_SECRET) as string;
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, decoded))
        .then((res) => res[0]);

      if (!user) {
        redirect("/login");
      }

      // Check access
      const isOwner = form.userId === user.id;
      const allowedEmails: string[] = (form.allowedEmails as string[]) || [];
      const isAllowed = allowedEmails.includes(user.email);

      if (!isOwner && !isAllowed) {
        return (
          <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center font-sans">
            <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-md w-full border border-slate-100">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                !
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
              <p className="text-slate-500">
                Sorry, you do not have permission to access this private form. Please ensure you are
                logged in with an approved email address.
              </p>
            </div>
          </div>
        );
      }
    } catch (e) {
      // Invalid token
      redirect("/login");
    }
  }

  return <PublicFormClient form={form} />;
}
