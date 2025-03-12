import * as React from 'react';
import { redirect } from 'next/navigation';
import { dbGetAssigneesByProjectId, dbGetProjectById } from '@/db/functions/project';
import { dbGetTasksByProjectId } from '@/db/functions/task';
import { Project } from './_page';

type statusType = "todo" | "ongoing" | "under-review" | "done";

type User = {
  id: string;
  name: string;
}

type Project = {
  id: string,
  description: string,
  name: string,
  createdAt: number,
}

type Task = {
  id: string,
  title: string,
  description: string,
  status: statusType,
}

export default async function Page(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params;
  let project;

  const projectResponse = await dbGetProjectById({projectId: id})
  if (projectResponse === undefined) {
    redirect("/home");
  } else {
    project = projectResponse;
  }

  const taskResponse = await dbGetTasksByProjectId({projectId: id});
  const tasks: Task[] = taskResponse === undefined ? [] : taskResponse;

  const assigneeResponse = await dbGetAssigneesByProjectId({projectId: id});
  const assignees: User[] = assigneeResponse === undefined ? [] : assigneeResponse;

  

  return (
    <Project project={project} tasks={tasks} assignees={assignees} />
  );
}