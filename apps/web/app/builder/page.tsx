import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormBuilderApp } from "./FormBuilderApp";

export default async function BuilderPage(props: { searchParams: Promise<{ id?: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");
    const searchParams = await props.searchParams;

    if (!token) {
        redirect("/login");
    }

    return <FormBuilderApp formId={searchParams.id} />;
}
