import { NextRequest, NextResponse } from 'next/server';
import { dbAssignUserToProject, dbDeleteUserToProject, dbGetAssigneesByProjectId } from '@/db/functions/project';
import { getMaybeUser } from '@/auth/utils';
import { redirect } from 'next/navigation';
import { dbGetAssigneesByTaskId } from '@/db/functions/task';

export async function GET(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }

  const { projectId } = await request.json();

  if (!projectId) return NextResponse.json({error: "ProjectId is mandatory"}, {status: 400});

  const response = dbGetAssigneesByProjectId(projectId);
  if (response === undefined) return NextResponse.json({error: "No Assignees found!"}, {status: 400});
  return NextResponse.json(response, {status: 200});
}


export async function POST(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }
  const { userId, projectId } = await request.json();

  if (!userId || !projectId) {
    return NextResponse.json(
      { error: 'Both UserId and ProjectId are mandatory' },
      { status: 400 },
    );
  }

  const success = await dbAssignUserToProject({userId, projectId});
  if (success === undefined) return NextResponse.json({ message: "Project assignment was not successful!"}, {status: 500});

  return NextResponse.json({ message: 'Project assignment successfully added!' }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }
  const {userId, projectId } = await request.json();

  if (!userId || !projectId ) {
    return NextResponse.json(
      {error: 'Both userId and projectId are mandatory' },
      {status: 400},
    );
  }

  await dbDeleteUserToProject({userId, projectId});

  return NextResponse.json({ message: 'Project Assignment successfully deleted!' }, {status: 200});
}