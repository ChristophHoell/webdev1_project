'use client';

import { NewTaskModal } from './task-modal';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export function TaskList({
  projectId,
  tasks,
}: {
  projectId: number,
  tasks: { id: number, title: string, description: string, status: string }[],
}) {
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);

  const router = useRouter();

  async function handleNewTask(title: string, description: string) {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, projectId }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    setShowNewTaskModal(false);
    router.refresh();
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="mb-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 shadow"
      >
        Add New Task
      </button>
      <div className="my-8 mx-auto max-w-2xl">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow mb-4 hover:shadow transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <p className="text-sm text-blue-500">{task.status}</p>
          </div>
        ))}
      </div>
      {showNewTaskModal && (
        <NewTaskModal onSubmit={handleNewTask} onClose={() => setShowNewTaskModal(false)} />
      )}
    </div>
  );
}
