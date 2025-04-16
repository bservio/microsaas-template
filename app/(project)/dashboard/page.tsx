import { handleGoogleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>{session?.user?.email}</p>
      <form action={handleGoogleAuth}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" type="submit">Logout</button>
      </form>
      <Link href="/pagamentos">Pagamentos</Link>
    </div>
  )
}
