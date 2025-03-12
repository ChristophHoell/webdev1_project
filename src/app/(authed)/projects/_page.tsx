'use client';

import { NewProjectModal } from '@/app/components/project-modal';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ProjectList } from '@/app/components/project-list';

export function ProjectsListAll({
  projects,
}: {
  projects: { id: string, name: string, description: string, createdAt: Date }[]
}) {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);

  async function handleNewProject(name: string, description: string) {
    const response = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, description: description }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    setShowModal(false);
    router.push("/projects");
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
        <div className="my-8 mx-auto w-full max-w-2xl">
          {
            <ProjectList projects={projects} />
          }
        </div>
      }

      {showModal && (
        <NewProjectModal onSubmit={handleNewProject} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
