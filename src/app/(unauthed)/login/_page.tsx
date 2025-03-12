"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SignInResponse } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { credentialsSchema } from "@/auth/schema";
import type { ZodIssue } from "zod";
import Link from "next/link";

export function SignInForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validation = credentialsSchema.safeParse({ email, password });

    if (!validation.success) {
      const errors: ZodIssue[] = validation.error.errors;

      if (validation.error && errors !== undefined && errors[0] !== undefined) {
        const errorMessage =
          errors.length > 0 ? errors[0].message : "Invalid Input";
        setError(errorMessage);
      } else {
        setError("Invalid Input");
      }
      return
    }
    const result: SignInResponse | undefined = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result !== undefined && result.error) {
      let errorMessage = result.error;
      if (
        errorMessage === "Configuration" ||
        errorMessage === "CredentialsSignin"
      ) {
        errorMessage = "Wrong Credentials";
      }
      setError(errorMessage);
    } else if (result !== undefined) {
      router.push("/home");
    } else {
      setError("An unknown error has occurred!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-sm flex-col gap-4 rounded-md border border-gray-300 bg-white p-6"
    >
      <label htmlFor="email" className="font-bold">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="w-full rounded border border-gray-400 p-3"
      />

      <label htmlFor="password" className="font-bold">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="w-full rounded border border-gray-400 p-3"
      />

      <button type="submit" className="btn-primary mt-2 w-full rounded">
        Login
      </button>
      <Link href="/register">
        <button type="button" className="btn-primary mt-2 w-full rounded">
          Register
        </button>
      </Link>

      {error !== '' && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  )
}