import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth } from ".";
import { dbGetUserById } from "@/db/functions/user";
import type { ObscuredUserType } from "@/db/schema";

export async function getValidSession(): Promise<Session> {
  try {
    const session = await auth();
    if (session === null){
      redirect("/login");
    }
    return session;
  } catch (error: unknown) {
    console.error("Error fetching valid session: ", error);
    redirect("/login");
  }
}

export async function getMaybeSession(): Promise<Session | null> {
  try {
    const session = await auth();
    return session;
  } catch (error: unknown) {
    console.error("Error fetching session ", error);
    return null;
  }
}

export async function getMaybeUser(): Promise<ObscuredUserType | null> {
  try {
    const session = await auth();
    if (session === null) return null;
    const user = session.user;
    if (user === undefined) return null;
    const dbUser = await dbGetUserById({ userId: user.id });
    if (dbUser === undefined) return null;
    return dbUser;
  } catch (error: unknown) {
    console.error("Error fetching user: ", error);
    return null;
  }
}

export async function getUser(): Promise<ObscuredUserType> {
  const session = await getValidSession();
  const user = session.user;
  if (user === undefined) {
    redirect("/logout");
  }
  const dbUser = await dbGetUserById({ userId: user.id });
  if (dbUser === undefined) {
    redirect("/logout");
  }
  return dbUser;
}