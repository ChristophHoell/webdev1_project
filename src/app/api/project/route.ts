import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getMaybeUser } from '@/auth/utils';
import { dbCreateProject, dbGetProjectById } from '@/db/functions/project';

export async function POST(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null){
    redirect("/login");
  }
  const { name, description } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
  }

  await dbCreateProject({name, description});

  return NextResponse.json({ message: 'Project inserted successfully' }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const maybeUser = await getMaybeUser();
  if (maybeUser === null){
    redirect("/login");
  }
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Project Id is required" }, { status: 400 });
  }

  const response = await dbGetProjectById(id);

  if (response === undefined) return NextResponse.json({error: "Project not found!"}, {status: 400});

  return NextResponse.json(response, {
    status: 200,
  });

}