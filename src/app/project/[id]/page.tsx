import { TaskList } from './task-list';

type statusType = "todo" | "ongoing" | "under-review" | "done";

type User = {
  id: number;
  name: string;
}

type Project = {
  id: number,
  description: string,
  title: string,
  createdAt: number,
}

type Task = {
  id: number,
  title: string,
  description: string,
  status: statusType,
}

export default async function Project(props: {
  params: Promise<{ id: number }>
}) {
  const { id } = await props.params;

  const projectResponse = await fetch("/api/project", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id}),
  })

  if (!projectResponse.ok) throw new Error("Failed to fetch tasks");
  const project : Project = await projectResponse.json();

  const taskResponse = await fetch("/api/task", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id}),
  });

  if (!taskResponse.ok) throw new Error("Failed to fetch tasks");
  const tasks: Task[] = await taskResponse.json();

  const assigneeResponse = await fetch("/api/asignees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  });

  if (!assigneeResponse.ok) throw new Error("Failed to fetch assignees!");
  const assignees: User[] = await assigneeResponse.json();



  return (
    <>
      <h1 className="text-center mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-400">
        {project.title}
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray:200">
                  <td className="px-6 py-4">{user.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <TaskList projectId={id} tasks={tasks} />
    </>
  );
}