"use client"
import { insertUserSchema } from "@/db/schema"
import { useState } from "react";
import { ZodIssue } from "zod";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";

export function RegisterForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password_repeat = formData.get("password_repeat") as string;

    if (password !== password_repeat) {
      setError("The Passwords do not match");
      return
    }

    const validation = insertUserSchema.safeParse({ name: name, email: email, passwordHash: password });

    if (!validation.success) {
      const errors: ZodIssue[] = validation.error.errors;

      if (validation.error && errors !== undefined && errors[0] !== undefined) {
        const errorMessage = errors.length > 0 ? errors[0].message : "Invalid Input";
        setError(errorMessage);
      } else {
        setError("Invalid Input");
      }
      return
    }

    const registrationResponse = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const registrationResponseJson = await registrationResponse.json();

    if (!registrationResponse.ok) setError(registrationResponseJson.message);

    const signInResponse: SignInResponse | undefined = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResponse !== undefined && signInResponse.error) {
      let errorMessage = signInResponse.error;

      if (
        errorMessage === "Configuration" ||
        errorMessage === "CredentialsSignin"
      ) {
        errorMessage = "Wrong Credentials";
      }
      setError(errorMessage);
    } else if (signInResponse !== undefined) {
      router.push("/home");
    } else {
      setError("An unknown error has occured!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-sm flex-col gap-4 rounded-md border border-gray-300 bg-white p-6"
    >
      <label htmlFor="name" className="font-bold">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="w-full rounded border border-gray-400 p-3"
      />

      <label htmlFor="email" className="font-bold">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="w-full rounded border border-gray-400 p-3"
      />

      <label htmlFor="password" className="font-bold">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="w-full rounded border border-gray-400 p-3"
      />

      <label htmlFor="password_repeat" className="font-bold">Repeat Password</label>
      <input
        id="password_repeat"
        name="password_repeat"
        type="password"
        required
        className="w-full rounded border border-gray-400 p-3"
      />

      <button type="submit" className="btn-primary mt-2 w-full rounded">Register</button>
      <Link href="/login">
        <button type="button" className="btn-primary mt-2 w-full rounded">
          Login
        </button>
      </Link>

      {error !== "" && <p className="mt-2 text-red-500">{error}</p>}

    </form>
  )
}