"use client"
import * as React from "react";
import { useRouter } from "next/navigation";
import { TaskList } from "@/app/components/task-list";
import { NewTaskModal } from "@/app/components/task-modal";

type statusType = "todo" | "ongoing" | "under-review" | "done";

type User = {
  id: string;
  name: string;
}

type Project = {
  id: string,
  description: string,
  name: string,
  createdAt: Date,
}

type Task = {
  id: string,
  title: string,
  description: string,
  status: statusType,
}

export function Project({
  project,
  tasks,
  assignees,
}: {
  project: Project,
  tasks: Task[],
  assignees: User[],
}) {
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);
  const router = useRouter();

  async function handleNewTask(title: string, description: string, assigneeId: string) {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, projectId: project.id, assigneeId: assigneeId }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    setShowNewTaskModal(false);
    router.refresh();
  }

  return (
    <>
      <h1 className="text-center mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-400">
        {project.name}
      </h1>
      <div className="my-8 mx-auto w-full max-w-2xl">
        <table className="w-full text-sm text-left rtl:text-rigt text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Asignee:
              </th>
            </tr>
          </thead>
          <tbody>
            {
              assignees.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray:200">
                  <td className="px-6 py-4">{user.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className="my-8 mx-auto w-full max-w-2xl">
        <button
          onClick={() => setShowNewTaskModal(true)}
          className="mb-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 shadow"
        >
          Add New Task
        </button>

        <TaskList tasks={tasks} />

        {showNewTaskModal && (
          <NewTaskModal onSubmit={handleNewTask} onClose={() => setShowNewTaskModal(false)} assignees={assignees} />
        )}
      </div>
    </>
  )
}