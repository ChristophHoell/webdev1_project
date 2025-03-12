'use client';

import * as React from 'react';

export function TaskList({
  tasks,
}: {
  tasks: { id: string, title: string, description: string, status: string }[],
}) {

  return (
    <div className="my-8 mx-auto max-w-2xl">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow mb-4 hover:shadow transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm text-blue-500">{task.status}</p>
        </div>
      ))}
    </div>
  );
}
