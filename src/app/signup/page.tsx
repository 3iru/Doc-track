"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/server/action";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/app/loading";
import Link from "next/link";
import { signInSchema } from "@/server/zod";
import { ZodError } from "zod";

export default function SignUp() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/view");
    }
  }, [status, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const useremail = formData.get("email") as string;
    const userpassword = formData.get("password") as string;

    try {
      const { email, password } = await signInSchema.parseAsync({
        email: useremail,
        password: userpassword,
      });

      const res = await signUp(email, password);

      if (res?.ok) {
        window.location.href = "/view";
      } else if (res?.error) {
        throw new Error(res.message);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setError( 
          "Looks like there's an issue with your input. Please check again!"
        );
      } else {
        setError(error instanceof Error ? error.message : String(error));
      }
    }
  };

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 p-6 bg-card rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-foreground">
          Sign Up
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="border-slate-500"
              type="email"
              required
              name="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="border-slate-500"
              type="password"
              required
              name="password"
            />
            <p className="text-sm text-muted-foreground">Password must be more than 8 characters</p>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="text-center">
          <Link href="/signin" className="text-blue-500 hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
