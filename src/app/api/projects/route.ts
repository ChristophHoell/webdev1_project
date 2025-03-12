import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { getMaybeUser } from '@/auth/utils';
import { dbGetProjects } from '@/db/functions/project';

export async function GET() {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null){
    redirect("/login");
  }

  const response = await dbGetProjects();

  if (response === undefined) return NextResponse.json({error: "Project not found!"}, {status: 400});

  return NextResponse.json(response, {
    status: 200,
  });

}