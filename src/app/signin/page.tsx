"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/server/action";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/app/loading";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await authenticate(formData);

    if (res?.error) {
      setError(res.message);
    } else if (res?.ok) {
      window.location.href = "/dashboard";
    }
  };

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 p-6 bg-card rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-foreground">
          Welcome Back!
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
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="text-center">
          <Link href="/signup" className="text-blue-500 hover:underline">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
