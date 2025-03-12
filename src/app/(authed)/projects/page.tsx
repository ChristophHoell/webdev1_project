import { redirect } from 'next/navigation';
import { getMaybeUser } from '@/auth/utils';
import { ProjectsListAll } from './_page';
import { dbGetProjects } from '@/db/functions/project';

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
    
  const projectsResponse = await dbGetProjects();
  const projects: Project[] = projectsResponse === undefined ? [] : projectsResponse;

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <ProjectsListAll projects={projects}/>
    </div>
  );
}
