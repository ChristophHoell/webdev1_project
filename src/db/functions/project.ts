import { and, eq } from 'drizzle-orm';
import { taskTable, userTable, projectTable, userToProject } from '../schema';
import db from "..";

export async function dbGetProjectById({
  projectId,
}: {
  projectId: string | undefined,
}) {
  if (projectId === undefined) return undefined;

  const maybeProject = (
    await db.select().from(projectTable).where(eq(projectTable.id, projectId))
  )[0];

  if (maybeProject === undefined) return undefined;
  return maybeProject;
}

export async function dbGetAssigneesByProjectId({
  projectId,
}: {
  projectId: string | undefined;
}) {
  if (projectId === undefined) return undefined;

  const maybeUsers = (
    await db.select({
      id: userTable.id,
      email: userTable.email,
      name: userTable.name,
    })
    .from(userTable)
    .innerJoin(userToProject, eq(userTable.id, userToProject.userId))
    .innerJoin(projectTable, eq(userToProject.projectId, projectTable.id))
    .where(eq(projectTable.id, projectId))
  )

  if (maybeUsers === undefined) return undefined;
  return maybeUsers;
}

export async function dbGetTasksByProjectId({
  projectId,
}: {
  projectId: string | undefined;
}) {
  if (projectId === undefined) return undefined;

  const maybeTasks = (
    await db.select()
      .from(taskTable)
      .where(eq(taskTable.projectId, projectId))
  )

  if (maybeTasks === undefined) return undefined;
  return maybeTasks;
}

export async function dbCreateProject({
  name,
  description,
}: {
  name: string,
  description: string,
}) {
  await db.insert(projectTable).values({
    name: name,
    description: description,
  });
}

export async function dbAssignUserToProject({
  userId,
  projectId,
}: {
  userId: string,
  projectId: string,
}) {
  const userRows = await db.select().from(userTable).where(eq(userTable.id, userId));
  if (userRows.length === 0) return undefined;

  const projectRows = await db.select().from(projectTable).where(eq(projectTable.id, projectId));
  if (projectRows.length === 0) return undefined;

  await db.insert(userToProject).values({
    userId: userId,
    projectId: projectId,
  });
}

export async function dbDeleteUserToProject({
  userId,
  projectId,
}: {
  userId: string,
  projectId: string,
}) {
  await db.delete(userToProject).where(and(eq(userToProject.userId, userId), eq(userToProject.projectId, projectId)));
}