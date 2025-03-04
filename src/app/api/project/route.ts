import { db } from '@/app/db';
import { projectTable } from '@/app/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
  }

  await db.insert(projectTable).values({ name });

  return NextResponse.json({ message: 'Project inserted successfully' }, { status: 200 });
}
