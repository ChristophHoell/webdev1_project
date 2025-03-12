import * as React from "react";
import { redirect } from "next/navigation";
import { getMaybeUser } from "@/auth/utils";
import { ProjectList } from "@/app/components/project-list";
import { dbGetProjectsByUserId } from "@/db/functions/project";

type Project = {
  id: string,
  description: string,
  name: string,
  createdAt: Date,
}

export default async function Page() {
  const maybeUser = await getMaybeUser()
  if (maybeUser === null) {
    redirect("/login");
  }

  const projectsResponse = await dbGetProjectsByUserId({userId: maybeUser.id})
  const projects: Project[] = projectsResponse === undefined ? [] : projectsResponse;

  return (
    <>
      <h1 className="text-center mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-400">
        My Projects
      </h1>
      <div className="my-8 mx-auto w-full max-w-2xl">
        {
          <ProjectList projects={projects} />
        }
      </div>
    </>

  );
}