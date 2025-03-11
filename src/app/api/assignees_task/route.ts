import { NextRequest, NextResponse } from 'next/server';
import { dbAssignUserToProject, dbDeleteUserToProject } from '@/db/functions/project';
import { getMaybeUser } from '@/auth/utils';
import { redirect } from 'next/navigation';
import { dbGetAssigneesByTaskId } from '@/db/functions/task';

export async function GET(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }

  const { taskId } = await request.json();

  if (!taskId) return NextResponse.json({error: "TaskId is mandatory"}, {status: 400});
  const response = dbGetAssigneesByTaskId(taskId);
  if (response === undefined) return NextResponse.json({error: "No task found!"}, {status: 400});
  return NextResponse.json(response, {status: 200});
}
