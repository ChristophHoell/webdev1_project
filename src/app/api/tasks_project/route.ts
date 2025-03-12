import { NextRequest, NextResponse } from 'next/server';
import { dbGetTasksByProjectId } from '@/db/functions/task';
import { getMaybeUser } from '@/auth/utils';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }

  const { id } = await request.json();

  if (!id) return NextResponse.json({error: "No ProjectId was provided!"}, {status: 400});

  const response = await dbGetTasksByProjectId(id);
  if (response === undefined) return NextResponse.json({error: "No tasks found for this project!"}, {status: 400});
  return NextResponse.json(response, {status: 200}, )
}