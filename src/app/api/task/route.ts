import { db } from '@/app/db';
import { taskTable } from '@/app/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { title, description, status, projectId } = await request.json();

  if (!title || !description || !projectId) {
    return NextResponse.json(
      { error: 'Task title, description and project ID are required' },
      { status: 400 },
    );
  }

  await db.insert(taskTable).values({ title, description, status: 'inprogress', projectId });

  return NextResponse.json({ message: 'Task inserted successfully' }, { status: 200 });
}
