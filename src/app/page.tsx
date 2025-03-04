import { db } from './db';
import { projectTable } from './db/schema';
import { ProjectList } from './project-list';

export default async function Home() {
  const projects = await db.select().from(projectTable);

  return <ProjectList projects={projects} />;
}
