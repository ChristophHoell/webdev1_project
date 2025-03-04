'use client';

import { NewProjectModal } from './project-modal';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function ProjectList({ projects }: { projects: { id: number, name: string }[] }) {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);

  async function handleNewProject(name: string) {
    const response = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    setShowModal(false);
    router.refresh();
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 shadow transition"
      >
        Add New Project
      </button>

      {
        <div className="my-8 mx-auto max-w-2xl">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between bg-white p-4 rounded shadow mb-4 hover:shadow transition">
              <Link href={`/project/${project.id}`}>
                <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
                  {project.name}
                </span>
              </Link>             
            </div>
          ))}
        </div>
      }

      {showModal && (
        <NewProjectModal onSubmit={handleNewProject} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
