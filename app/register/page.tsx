import RegisterForm from "@/app/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/tasks");

  return (
    <main className="px-60 pb-16 my-auto">
      <RegisterForm />
    </main>
  )
}