import { db } from '@/db';
import { userTable } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { dbCreateUser } from '@/db/functions/user';

export async function POST(request: NextRequest) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return NextResponse.json(
            {error: "Name, Email and Password must not be empty"},
            {status: 400},
        );
    }

    await dbCreateUser({ email, password, name });

    return NextResponse.json({message: 'User created successfully'}, {status: 200});
}
/*
export async function UPDATE(request: NextRequest){
    const {id, name, email, password } = await request.json();

    if (!id || !name || !email || !password) {
        return NextResponse.json(
            {error: "ID, Name, Email and Password must not be empty"},
            {status: 400},
        );    
    }

    await db.update(userTable).set({name: name, email: email, password: password}).where(eq(userTable.id, id));

    return NextResponse.json({message: "User updated successfully"}, {status: 200});
}*/