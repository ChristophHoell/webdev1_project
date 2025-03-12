import { redirect } from "next/navigation";;
import { getMaybeUser } from "@/auth/utils"
import Link from "next/link";

export default async function Page() {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }

  return (
    <>
      <h1 className="text-center mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-400">
        Home
      </h1>
      <div className="my-8 mx-auto w-full max-w-2xl">
      <div key="all_projects" className="flex items-center justify-between bg-white p-4 rounded shadow mb-4 hover:shadow transition">
        <Link href={"/projects"}>
          <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
            All Projects
          </span>
        </Link>
      </div>
      <div key="my_projects" className="flex items-center justify-between bg-white p-4 rounded shadow mb-4 hover:shadow transition">
        <Link href={"/my_projects"}>
          <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
            My Projects
          </span>
        </Link>
      </div>
      <div key="my_tasks" className="flex items-center justify-between bg-white p-4 rounded shadow mb-4 hover:shadow transition">
        <Link href={"/my_tasks"}>
          <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
            My Tasks
          </span>
        </Link>
      </div>
    </div>
    </>
  )
  
}