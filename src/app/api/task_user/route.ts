import { NextRequest, NextResponse } from 'next/server';
import { getMaybeUser } from '@/auth/utils';
import { redirect } from 'next/navigation';
import { dbGetTasksByUserId } from '@/db/functions/task';

export async function GET(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null) {
    redirect("/login");
  }

  const { userId } = await request.json();

  if (!userId) return NextResponse.json({error: "UserId is mandatory"}, {status: 400});
  const response = dbGetTasksByUserId(userId);
  if (response === undefined) return NextResponse.json({error: "No task found!"}, {status: 400});
  return NextResponse.json(response, {status: 200});
}
