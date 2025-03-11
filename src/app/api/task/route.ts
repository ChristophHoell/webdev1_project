import { db } from '@/db';
import { taskTable } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { dbCreateTask, dbGetTaskById } from '@/db/functions/task';
import { getMaybeUser } from '@/auth/utils';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }

  const { id } = await request.json();

  if (!id) return NextResponse.json({error: "No TaskId was provided!"}, {status: 400});

  const response = await dbGetTaskById(id);
  if (response === undefined) return NextResponse.json({error: "No task with this id found!"}, {status: 400});
  return NextResponse.json(response, {status: 200}, )
}

export async function POST(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }
  
  const { title, description, status, projectId, creatorId, asigneeId } = await request.json();

  if (!title || !description || !projectId || !creatorId) {
    return NextResponse.json(
      { error: 'Task title, description, project ID and creator ID are required' },
      { status: 400 },
    );
  }

  const response = await dbCreateTask({title, description, status, projectId, creatorId, asigneeId});
  if (response === undefined) return NextResponse.json({error: "Task could not be created"}, {status: 400});
  
  return NextResponse.json({ message: 'Task inserted successfully' }, { status: 200 });
}

/*
export async function UPDATE(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }
  const {id, title, description, status, asigneeId } = await request.json();

  if (!id || !title || !description || !status ) {
    return NextResponse.json(
      {error: 'ID, Task title, description, status are required' },
      {status: 400},
    );
  }

  await db.update(taskTable).set({title: title, description: description, status: status, asigneeId: asigneeId}).where(eq(taskTable.id, id));

  return NextResponse.json({ message: 'Task updated successfully' }, {status: 200});
}*/