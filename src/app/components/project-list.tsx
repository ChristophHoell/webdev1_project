"use-client";

import Link from "next/link";
import * as React from "react";

export function ProjectList({
  projects,
}: {
  projects: { id: string, name: string, description: string, createdAt: Date }[],
}) {
  return (
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
  );
}