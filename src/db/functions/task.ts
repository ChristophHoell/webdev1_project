import { eq } from 'drizzle-orm';
import { projectTable, taskTable, userTable } from '../schema';
import db from "..";

type statusType = "todo" | "ongoing" | "under-review" | "done";

export async function dbGetTaskById({
  taskId,
}: {
  taskId: string | undefined;
}) {
  if (taskId === undefined) return undefined;

  const maybeTask = (
    await db.select().from(taskTable).where(eq(taskTable, taskId))
  )[0];

  if (maybeTask === undefined) return undefined;
  return maybeTask;
}

export async function dbGetTasksByProjectId({
  projectId,
}: {
  projectId: string | undefined;
}) {
  if (projectId === undefined) return undefined;

  const maybeTasks = (
    await db.select().from(taskTable).where(eq(taskTable.projectId, projectId))
  );

  if (maybeTasks.length === 0) return undefined;
  return maybeTasks;
}

export async function dbGetTasksByUserId({
  userId,
}: {
  userId: string | undefined;
}) {
  if (userId === undefined) return undefined;

  const maybeTasks = (
    await db.select().from(taskTable).where(eq(taskTable.asigneeId, userId))
  );

  if (maybeTasks.length === 0) return undefined;
  return maybeTasks;
}

export async function dbGetAssigneesByTaskId({
  taskId,
}: {
  taskId: string | undefined;
}) {
  if (taskId === undefined) return undefined;

  const maybeUsers = (
    await db.select({
      id: userTable.id,
      email: userTable.email,
      name: userTable.name,
    }).from(userTable)
      .innerJoin(userTable, eq(userTable.id, taskTable.asigneeId))
      .where(eq(taskTable.id, taskId))
  )

  if (maybeUsers.length === 0) return undefined;
  return maybeUsers;

}

export async function dbCreateTask({
  title,
  description,
  status,
  duration,
  projectId,
  creatorId,
  asigneeId,
}: {
  title: string,
  description: string,
  status: statusType,
  duration?: number,
  projectId: string,
  creatorId: string,
  asigneeId?: string,
}) {
  const userRows = await db.select().from(userTable).where(eq(userTable.id, creatorId));
  if (userRows.length === 0) return undefined;
  
  if (asigneeId != undefined) {
    const userRows = await db.select().from(userTable).where(eq(userTable.id, asigneeId));
    if (userRows.length === 0) return undefined;
  }

  const projectRows = await db.select().from(projectTable).where(eq(projectTable.id, projectId));
  if (projectRows.length === 0) return undefined;

  await db.insert(taskTable).values({
    title: title,
    description: description,
    status: status,
    duration: duration,
    projectId: projectId,
    creatorId: creatorId,
    asigneeId: asigneeId,
  });
}