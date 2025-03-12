import { getMaybeUser } from '@/auth/utils';
import { redirect } from 'next/navigation';
import { SignInForm } from './_page';


export default async function Page() {
  const maybeUser = await getMaybeUser();
  if (maybeUser !== null) {
    redirect("/home");
  }

  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-4xl flex-col p-4">
       <SignInForm />
    </main>
  );
}