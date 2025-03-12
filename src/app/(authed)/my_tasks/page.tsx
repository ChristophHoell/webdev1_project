"use server"
import * as React from "react";
import { redirect } from "next/navigation";
import { getMaybeUser } from "@/auth/utils";
import { TaskList } from "@/app/components/task-list";
import { dbGetTasksByUserId } from "@/db/functions/task";

type statusType = "todo" | "ongoing" | "under-review" | "done";

type Task = {
  id: string,
  title: string,
  description: string,
  status: statusType,
}

export default async function Page() {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }

  const tasksResponse = await dbGetTasksByUserId({userId: maybeUser.id});
  const tasks: Task[] = tasksResponse === undefined ? [] : tasksResponse;

  return (
    <>
      <h1 className="text-center mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-400">
        My Tasks
      </h1>
      <TaskList tasks={tasks} />
    </>
  );

}